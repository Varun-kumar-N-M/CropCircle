import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  AppState,
  Platform,
  StatusBar,
  AppStateStatus,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './ScreensStack';
import * as IXNUtils from '../utils/IXNUtils';
import {resetApp} from '../services/navigationService';
import SplashScreen from 'react-native-splash-screen';
import {useSelector, useDispatch} from 'react-redux';
import * as commonActions from '../actions/commonActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootScreen = () => {
  const appState = useRef(AppState.currentState);
  const splashTimeout = useRef<NodeJS.Timeout | null>(null);
  const appStateListener = useRef<any>(null);

  const inactiveTimestamp = useSelector(
    (state: any) => state.commonReducer.inactiveTimestamp,
  );
  const dispatch = useDispatch();

  useEffect(() => {
      SplashScreen.hide();
    appStateListener.current = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.current?.remove();
      if (splashTimeout.current) {
        clearTimeout(splashTimeout.current);
      }
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus): void => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const idleDuration = new Date().getTime() / 1000 - inactiveTimestamp;
      if (idleDuration / 60.0 > 5.0) {
        resetApp();
        return;
      }
      checkAndLoadEvent();
    }

    if (nextAppState.match(/inactive|background/)) {
      const nowTS = new Date().getTime() / 1000;
      dispatch(commonActions.setInactiveTimestamp(nowTS));
    }

    appState.current = nextAppState;
  };

  const checkAndLoadEvent = async (): Promise<void> => {
    const eventId = await IXNUtils.getAutoEventId();
    if (eventId && eventId.length > 0) {
      resetApp();
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <StatusBar translucent backgroundColor="transparent" />
      )}
      <SafeAreaProvider>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default RootScreen;
