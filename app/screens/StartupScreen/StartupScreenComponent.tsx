/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  NativeModules,
  AppState,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import screenStyles from './StartupScreenStyles';
import * as CONST from '../../utils/Constants';
import * as AppConfig from '../../common/AppConfig';
import * as APIConfig from '../../services/config';
import * as IXNUtils from '../../utils/IXNUtils';
import * as STR_CONST from '../../utils/StringContants';
import Scale from '../../utils/Scale';
import FastImage from 'react-native-fast-image';

const StartupScreen = (props: any) => {
  // const {startupResponse, errorResponse, userInfoResponse, userInfoError} =
  //   props;
  // const [showEnvSelection, setShowEnvSelection] = useState(false);
  // const [isStartupSuccess, setIsStartupSuccess] = useState(false);
  // const [isEnvSelected, setIsEnvSelected] = useState(false);
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // const [isAccessTokenNotAvailable, setisAccessTokenNotAvailable] =
  //   useState(false);
  // const _handleAppStateChange = (nextAppState: any) => {
  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  // };

  // useEffect(() => {
  //   const listener = AppState.addEventListener('change', _handleAppStateChange);
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);
  // const [startupParams, setStartupParams] = useState({
  //   odid: '',
  //   device: '',
  //   build: '',
  //   idfv: '',
  //   idfa: '',
  //   device_model: '',
  //   device_name: '',
  //   os_name: '',
  //   os_version: '',
  //   os_other_info: '',
  //   device_localized_model: '',
  //   device_manufacturer: '',
  //   bundle_id: '',
  //   country_code: '',
  //   country_name: '',
  //   system_locale: '',
  //   current_locale: '',
  //   available_external_memory: '',
  //   total_external_memory: '',
  //   available_internal_memory: '',
  //   total_internal_memory: '',
  //   available_ram: '',
  //   total_ram: '',
  //   loaded: false,
  //   // url: '',
  // });

  // const fetchStartupParams = async () => {
  //   setStartupParams({
  //     build: await IXNUtils.getAppVersion(),
  //     odid: await IXNUtils.getOpenUDID(),
  //     device: await IXNUtils.getDeviceType(),
  //     idfv: await IXNUtils.getAppleVenderUDID(),
  //     idfa: await IXNUtils.getIDFA(),
  //     device_model: await IXNUtils.getDeviceModel(),
  //     device_name: await IXNUtils.getDeviceName(),
  //     os_name: await IXNUtils.getSystemName(),
  //     os_version: await IXNUtils.getSystemVersion(),
  //     os_other_info: await IXNUtils.getMachineName(),
  //     device_localized_model: await IXNUtils.getLocalizedModel(),
  //     device_manufacturer: await IXNUtils.getManufacturer(),
  //     bundle_id: await IXNUtils.getBundleId(),
  //     country_code: await IXNUtils.getCountryCode(),
  //     country_name: await IXNUtils.getCountryName(),
  //     system_locale: await IXNUtils.getSystemLocale(),
  //     current_locale: await IXNUtils.getCurrentLocale(),
  //     available_external_memory:
  //       await IXNUtils.getAvailableExternalMemorySize(),
  //     total_external_memory: await IXNUtils.getTotalExternalMemorySize(),
  //     available_internal_memory:
  //       await IXNUtils.getAvailableInternalMemorySize(),
  //     total_internal_memory: await IXNUtils.getTotalInternalMemorySize(),
  //     available_ram: await IXNUtils.getAvailableRAMSize(),
  //     total_ram: await IXNUtils.getTotalRAMSize(),
  //     loaded: true,
  //   });

  //   fetchUserAccessToken();
  // };

  // const fetchUserAccessToken = async () => {
  //   const userTokenCurr = await IXNUtils.getStringFromKeychain(
  //     CONST.USER_TOKEN,
  //   );
  //   AppConfig.updateUserToken(userTokenCurr);
  //   AppConfig.updateAppVersion(await IXNUtils.getAppVersion());
  // };

  // useEffect(() => {
  //   if (appStateVisible === 'active') {
  //     handleStartupResponse();
  //   }
  // }, [startupResponse, errorResponse, appStateVisible]);

  // useEffect(() => {
  //   if (startupParams.loaded == true) {
  //     AppConfig.updateDeviceInfo(startupParams);

  //     if (AppConfig.APP_ENV() === AppConfig.Environments.prod) {
  //       envSelectionAction(AppConfig.Environments.prod);
  //     } else {
  //       if (IXNUtils.getAutoEnv() !== -1) {
  //         envSelectionAction(IXNUtils.getAutoEnv());
  //         IXNUtils.setAutoEnv(-1);
  //         setShowEnvSelection(false);
  //       }
  //     }
  //   }
  // }, [startupParams.loaded]);

  // useEffect(() => {
  //   if (!isStartupSuccess && isEnvSelected) {
  //     if (startupParams.loaded === true) {
  //       props.getStartupData(startupParams);
  //     }
  //   }
  // }, [isStartupSuccess, startupParams, isEnvSelected]);

  // const handleStartupResponse = () => {
  //   if (startupResponse) {
  //     IXNUtils.consoleLog(
  //       props.route.name,
  //       'useEffect',
  //       'startupResponse',
  //       JSON.stringify(startupResponse),
  //     );
  //     setIsStartupSuccess(true);
  //     props.navigation.replace(STR_CONST.LOGIN_SCREEN);
  //   }

  //   if (errorResponse) {
  //     setIsStartupSuccess(false);
  //     IXNUtils.consoleLog(
  //       props.route.name,
  //       'useEffect',
  //       'errorResponse',
  //       JSON.stringify(errorResponse),
  //     );
  //     if (errorResponse.status === 'error') {
  //       if (errorResponse.message) {
  //         IXNUtils.showMessage(
  //           STR_CONST.ERROR,
  //           errorResponse.message,
  //           STR_CONST.RETRY,
  //           () => {
  //             props.getStartupData(startupParams);
  //           },
  //         );
  //       } else {
  //         IXNUtils.showMessage(
  //           STR_CONST.ERROR,
  //           STR_CONST.DEVICE_VALIDATION,
  //           STR_CONST.OK,
  //           () => {
  //             props.getStartupData(startupParams);
  //           },
  //         );
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (startupParams.loaded === false) {
  //     IXNUtils.consoleLog(
  //       props.route.name,
  //       'renderBody',
  //       'ScreenSize',
  //       CONST.CURRENT_SCREEN_WIDTH + 'x' + CONST.CURRENT_SCREEN_HEIGHT,
  //     );
  //     fetchStartupParams();
  //   }
  // }, []);

  // const renderEnvSelection = () => {
  //   return AppConfig.APP_ENV() !== AppConfig.Environments.prod ? (
  //     <View style={screenStyles.envContainer}>
  //       <View style={screenStyles.envButtonContainer}>
  //         {Object.keys(AppConfig.Environments).map(key => {
  //           return renderButton(AppConfig.Environments[key]);
  //         })}
  //       </View>
  //     </View>
  //   ) : (
  //     <View />
  //   );
  // };
  // const handleEnvSelection = (thisEnv: any) => {
  //   IXNUtils.consoleLog('StartUpScreen', `Selected Environment: ${thisEnv}`);
  //   IXNUtils.setAutoEnv(-1);
  //   setShowEnvSelection(false);
  //   IXNUtils.consoleLog(
  //     props.route.name,
  //     'envSelectionAction',
  //     'thisEnv',
  //     thisEnv,
  //   );
  //   AppConfig.updateAppEnv(thisEnv);
  //   IXNUtils.setStringIntoKeychain('env', '' + AppConfig.APP_ENV());
  //   APIConfig.updateApiEndpoint(AppConfig.APP_ENV());
  //   const accessToken = '';
  //   setIsEnvSelected(true);
  //   if (accessToken) {
  //     //TO-DO implement code to navigate home screen
  //   } else {
  //     setisAccessTokenNotAvailable(true);
  //   }
  // };
  // const renderButton = (thisEnv: any) => {
  //   return (
  //     <TouchableOpacity
  //       key={thisEnv}
  //       onPress={() => handleEnvSelection(thisEnv)}>
  //       <ImageBackground
  //         source={CONST.ENV_BUTTON_ICON}
  //         resizeMode={'stretch'}
  //         style={screenStyles.envButton}
  //         imageStyle={{borderRadius: Scale(0)}}>
  //         <Text style={screenStyles.envText}>{AppConfig.envName(thisEnv)}</Text>
  //       </ImageBackground>
  //     </TouchableOpacity>
  //   );
  // };
useEffect(()=>{
   setTimeout(()=>{
    props.navigation.replace(STR_CONST.LOGIN_SCREEN);
   },2000)
},[])
  const renderBody = () => {
    return (
      <View style={screenStyles.bodyContainer}>
        <FastImage
          resizeMode="cover"
          source={CONST.COMMON_LOGO_ICON}
          style={screenStyles.logoImage}
        />
        {/* {renderEnvSelection()} */}
        <Text style={screenStyles.textstyle}> Welcome To Farming App</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={screenStyles.container}>
      <StatusBar
        translucent
        backgroundColor={CONST.TRANSPARENT}
        barStyle="dark-content"
      />
      <View style={screenStyles.backgroundImage}>{renderBody()}</View>
    </SafeAreaView>
  );
};

export default StartupScreen;
