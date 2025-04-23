import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  LogBox,
  AppState,
  AppStateStatus,
  Platform,
  NativeModules,
  TextInput,
  Linking,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import createStore from './reducers';
import { PersistGate } from 'redux-persist/integration/react';
import RootScreen from './navigation/RootScreen';
import * as IXNUtils from './utils/IXNUtils';
import * as CONST from './utils/Constants';
import Orientation from 'react-native-orientation-locker';
import { Environments, updateAppEnv } from './common/AppConfig';
import * as AppConfig from './common/AppConfig';
import { resetApp } from './services/navigationService';
import { setDeeplinkData, setAutoEnv } from './utils/IXNUtils';

const { store, persistor } = createStore();

if (!__DEV__) {
  console.log = function () {};
}
IXNUtils.consoleLog('App.js', 'App.js', 'start', 'point');

LogBox.ignoreLogs([
  'Warning: Cannot update a component from inside the function body of a different component',
]);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const prevAppState = useRef<AppStateStatus>('');
  const appStateListener = useRef<any>(null);

  const getUrlInitially = async () => {
    const url = await NativeModules.NativeBridge.getEventIdOnLinking();
    URLRedirection(url || '');
  };

  const URLRedirection = (url: string) => {
    if (url && url !== '') {
      IXNUtils.consoleLog('App.js', 'URLRedirection', 'url', url);
      const params = url.split('/');
      let env = AppConfig.Environments.prod;

      if (url.includes('https://dev-pt')) {
        env = AppConfig.Environments.dev;
      } else if (url.includes('https://stg-pt')) {
        env = AppConfig.Environments.stage;
      }
      setAutoEnv(env);

      if (params.length >= 6 && params[3] === 'subs' && params[4] && params[5]) {
        const inviteObj = {
          team_id: params[4],
          invite_event_id: params[5],
        };
        setDeeplinkData(inviteObj);
        if (prevAppState.current.length !== 0) {
          setTimeout(() => {
            resetApp();
          }, 500);
        }
        return;
      }

      if (params.length >= 4 && !isNaN(Number(params[4]))) {
        IXNUtils.consoleLog('App.js', 'params[4]', 'params[4]', params[4]);
        setDeeplinkData({ event_id: params[4] });
        setTimeout(() => {
          resetApp();
        }, 500);
      }
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    IXNUtils.consoleLog('App.js', 'handleAppStateChange', 'nextAppState', nextAppState);

    if (nextAppState === 'active') {
      if (Platform.OS === 'android') {
        getUrlInitially();
      } else {
        const urlListener = (event: { url: string }) => {
          URLRedirection(event?.url || '');
          Linking.removeEventListener('url', urlListener);
        };
        Linking.addEventListener('url', urlListener);
      }

      prevAppState.current = appState;
      setAppState(nextAppState);
    }
  };

  useEffect(() => {
    updateAppEnv(Environments.dev);
    Orientation.lockToPortrait();

    appStateListener.current = AppState.addEventListener('change', handleAppStateChange);

    if (Platform.OS === 'android') {
      getUrlInitially();
    } else {
      const urlListener = (event: { url: string }) => {
        URLRedirection(event?.url || '');
      };
      Linking.addEventListener('url', urlListener);
    }

    return () => {
      appStateListener.current?.remove();
      Linking.removeAllListeners('url');
    };
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: CONST.WHITE_COLOR }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
