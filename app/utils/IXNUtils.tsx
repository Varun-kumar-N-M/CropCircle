import React from 'react';
import {
  Alert,
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
  AlertButton,
} from 'react-native'; 
import * as AppConfig from '../common/AppConfig';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';


let deepLinkData: any = null;
let autoEnv: number = -1;

export const consoleLog = (
  screen: string = 'DefaultScreen',
  method: string = 'DefaultMethod',
  title: string = 'DefaultTitle',
  message: any = '',
) => {
  if (AppConfig.APP_ENV() !== AppConfig.Environments.prod) {
    const dateTime = new Date();
    console.log(
      dateTime.toString() +
        '  ' +
        '[' +
        screen +
        ']->[' +
        method +
        ']:  ' +
        title +
        ': ',
      message,
    );
    // NativeModules.NativeBridge.nativeLog(
    //   '[' +
    //     screen +
    //     ']->[' +
    //     method +
    //     ']:  ' +
    //     title +
    //     ': ' +
    //     JSON.stringify(message),
    // );
  }
};

export const showMessage = (
  title: string = 'Alert',
  message: string = '',
  button1Title: string = 'OK',
  button1Callback: (() => void) | null = null,
  button2Title: string = '',
  button2Callback: (() => void) | null = null,
) => {
  let alertButtonsInfo: AlertButton[] = [
    {
      text: button1Title,
      onPress: button1Callback ? button1Callback : () => {},
      style: 'cancel',
    },
  ];
  if (button2Title.length > 0) {
    alertButtonsInfo.push({
      text: button2Title,
      onPress: button2Callback ? button2Callback : () => {},
    });
  }
  Alert.alert(title, message, alertButtonsInfo, {cancelable: false});
};


export const setStringIntoKeychain = async (key: string, value: string, addEnv: boolean = true): Promise<boolean> => {
  let keyVal = key;
  keyVal += addEnv ? AppConfig.envName(AppConfig.APP_ENV()) : '';
  const success = await NativeModules.NativeBridge.setStringIntoKeychain(
    keyVal,
    value,
  );
  consoleLog(
    'IXNUtils',
    'setStringIntoKeychain',
    'key:' + keyVal,
    'value:' + value,
  );
  return success;
};

export const logEvent = async (eventName: string, parameters: string): Promise<boolean> => {
  //Json string parameters
  const success = await NativeModules.NativeBridge.logEvent(
    eventName,
    parameters,
  );
  return success;
};

export const logScreen = async (screenName: string, screenClass: string): Promise<boolean> => {
  const params = {
    screen_name: screenName,
    screen_class: screenClass,
  };
  const success = await NativeModules.NativeBridge.logEvent(
    'screen_view',
    JSON.stringify(params),
  );
  return success;
};



export const getAutoEventId = async (): Promise<string> => {
  const value = await NativeModules.NativeBridge.getAutoEventId();
  consoleLog('IXNUtils', 'getAutoEventId', 'eventId:', 'value:' + value);
  return value;
};

export const getAutoEventMessage = async (): Promise<string> => {
  const value = await NativeModules.NativeBridge.getAutoEventMessage();
  consoleLog('IXNUtils', 'getAutoEventId', 'eventMessage:', 'value:' + value);
  return value;
};

export const resetAutoEventId = async (): Promise<any> => {
  const temp = await NativeModules.NativeBridge.resetAutoEventId();
  return temp;
};

export const isFTU = async (): Promise<boolean> => {
  const ftu = await NativeModules.NativeBridge.isFTU();
  consoleLog('IXNUtils', 'isFTU', 'ftu', ftu);
  return ftu;
};

export const getDeviceType = async (): Promise<string> => {
  const deviceType = await NativeModules.NativeBridge.getDeviceType();
  consoleLog('IXNUtils', 'getDeviceType', 'deviceType', deviceType);
  return deviceType;
};

export const getIDFA = async (): Promise<string> => {
  const idfa = await NativeModules.NativeBridge.getIDFA();
  consoleLog('IXNUtils', 'getIDFA', 'IDFA', idfa);
  return idfa;
};

export const getOpenUDID = async (): Promise<string> => {
  const odid = await NativeModules.NativeBridge.getOpenUDID();
  consoleLog('IXNUtils', 'getOpenUDID', 'odid', odid);
  return odid;
};

export const getCountryCode = async (): Promise<string> => {
  const countryCode = await NativeModules.NativeBridge.getCountryCode();
  consoleLog('IXNUtils', 'getCountryCode', 'countryCode', countryCode);
  return countryCode;
};

export const getCountryName = async (): Promise<string> => {
  const countryName = await NativeModules.NativeBridge.getCountryName();
  consoleLog('IXNUtils', 'getCountryName', 'countryName', countryName);
  return countryName;
};

export const getSystemLocale = async (): Promise<string> => {
  const systemLocale = await NativeModules.NativeBridge.getSystemLocale();
  consoleLog('IXNUtils', 'getSystemLocale', 'systemLocale', systemLocale);
  return systemLocale;
};

export const getCurrentLocale = async (): Promise<string> => {
  const currentLocale = await NativeModules.NativeBridge.getCurrentLocale();
  consoleLog('IXNUtils', 'getCurrentLocale', 'currentLocale', currentLocale);
  return currentLocale;
};

export const getAppleVenderUDID = async (): Promise<string> => {
  const appleVenderUDID = await NativeModules.NativeBridge.getAppleVenderUDID();
  consoleLog(
    'IXNUtils',
    'getAppleVenderUDID',
    'appleVenderUDID',
    appleVenderUDID,
  );
  return appleVenderUDID;
};

export const getMachineName = async (): Promise<string> => {
  const machineName = await NativeModules.NativeBridge.getMachineName();
  consoleLog('IXNUtils', 'getMachineName', 'machineName', machineName);
  return machineName;
};

export const getDeviceName = async (): Promise<string> => {
  const deviceName = await NativeModules.NativeBridge.deviceName();
  consoleLog('IXNUtils', 'getDeviceName', 'machineName', deviceName);
  return deviceName;
};

export const getSystemName = async (): Promise<string> => {
  const systemName = await NativeModules.NativeBridge.systemName();
  consoleLog('IXNUtils', 'getSystemName', 'systemName', systemName);
  return systemName;
};

export const getDeviceModel = async (): Promise<string> => {
  const deviceModel = await NativeModules.NativeBridge.deviceModel();
  consoleLog('IXNUtils', 'getDeviceModel', 'deviceModel', deviceModel);
  return deviceModel;
};

export const getLocalizedModel = async (): Promise<string> => {
  const localizedModel = await NativeModules.NativeBridge.localizedModel();
  consoleLog('IXNUtils', 'getLocalizedModel', 'localizedModel', localizedModel);
  return localizedModel;
};

export const getAppVersion = async (): Promise<string> => {
  const appVersion = await NativeModules.NativeBridge.getAppVersion();
  consoleLog('IXNUtils', 'getAppVersion', 'appVersion', appVersion);
  return appVersion;
};

export const getSystemVersion = async (): Promise<string> => {
  const systemVersion = await NativeModules.NativeBridge.getSystemVersion();
  consoleLog('IXNUtils', 'getSystemVersion', 'systemVersion', systemVersion);
  return systemVersion;
};

export const getBundleId = async (): Promise<string> => {
  const bundleId = await NativeModules.NativeBridge.getBundleId();
  consoleLog('IXNUtils', 'getBundleId', 'bundleId', bundleId);
  return bundleId;
};

export const getAvailableExternalMemorySize = async (): Promise<string> => {
  const availableExternalMemorySize =
    await NativeModules.NativeBridge.getAvailableExternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getAvailableExternalMemorySize',
    'availableExternalMemorySize',
    availableExternalMemorySize,
  );
  return availableExternalMemorySize;
};

export const getAvailableInternalMemorySize = async (): Promise<string> => {
  const availableInternalMemorySize =
    await NativeModules.NativeBridge.getAvailableInternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getAvailableInternalMemorySize',
    'availableInternalMemorySize',
    availableInternalMemorySize,
  );
  return availableInternalMemorySize;
};

export const getAvailableRAMSize = async (): Promise<string> => {
  const availableRAMSize =
    await NativeModules.NativeBridge.getAvailableRAMSize();
  consoleLog(
    'IXNUtils',
    'getAvailableRAMSize',
    'availableRAMSize',
    availableRAMSize,
  );
  return availableRAMSize;
};

export const getTotalExternalMemorySize = async (): Promise<string> => {
  const totalExternalMemorySize =
    await NativeModules.NativeBridge.getTotalExternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getTotalExternalMemorySize',
    'totalExternalMemorySize',
    totalExternalMemorySize,
  );
  return totalExternalMemorySize;
};

export const getTotalInternalMemorySize = async (): Promise<string> => {
  const totalInternalMemorySize =
    await NativeModules.NativeBridge.getTotalInternalMemorySize();
  consoleLog(
    'IXNUtils',
    'getTotalInternalMemorySize',
    'totalInternalMemorySize',
    totalInternalMemorySize,
  );
  return totalInternalMemorySize;
};

export const getTotalRAMSize = async (): Promise<string> => {
  const totalRAMSize = await NativeModules.NativeBridge.getTotalRAMSize();
  consoleLog('IXNUtils', 'getTotalRAMSize', 'totalRAMSize', totalRAMSize);
  return totalRAMSize;
};



export const clearCookies = async (): Promise<void> => {
  await NativeModules.NativeBridge.clearCookies();
};



export const getCacheDirectoryPath = async (): Promise<string> => {
  const cacheDirectoryPath =
    await NativeModules.NativeBridge.getCacheDirectoryPath();
  consoleLog(
    'IXNUtils',
    'getCacheDirectoryPath',
    'cacheDirectoryPath',
    cacheDirectoryPath,
  );
  return cacheDirectoryPath;
};

export const getManufacturer = async (): Promise<string> => {
  const manufacturer = await NativeModules.NativeBridge.getManufacturer();
  consoleLog('IXNUtils', 'getManufacturer', 'manufacturer', manufacturer);
  return manufacturer;
};

export const setDeeplinkData = (data: any): void => {
  deepLinkData = data;
};


export const setAutoEnv = (env: number): void => {
  autoEnv = env;
};

export const getStringFromKeychain = async (key: string): Promise<string> => {
  const value = await NativeModules.NativeBridge.getStringFromKeychain(
    key + AppConfig.envName(AppConfig.APP_ENV()),
  );
  consoleLog(
    'IXNUtils',
    'getStringFromKeychain',
    'key:' + key + AppConfig.envName(AppConfig.APP_ENV()),
    'value:' + value,
  );
  return value;
};


export const getAutoEnv = (): number => {
  return autoEnv;
};

export async function photoUpload(index:any, callback:any) {
  const options:any = {
    title: 'Select Image',
    customButtons: [
      {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: false,
    allowsEditing: true,
    quality: 0.7,
    mediaType: 'photo',
    maxWidth: 1024,
    maxHeight: 1024,
    cameraType: 'front',
  };
  if (index === 0) {
    let cameraPermissionStatus:any = false;
    let isCameraAuthorized = false;
    if (Platform.OS === 'android') {
      isCameraAuthorized = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (!isCameraAuthorized) {
        cameraPermissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      }
    }

    if (isCameraAuthorized || cameraPermissionStatus || Platform.OS === 'ios') {
      await launchCamera(options, (response) => {
        consoleLog(
          'IXNUtils',
          'photoUpload',
          'launchImageLibrary->response',
          JSON.stringify(response),
        );
        /*
        launchImageLibrary->response:  {"assets":[{"height":768,"width":1024,"type":"image/jpeg",
        "fileName":"rn_image_picker_lib_temp_418e6f93-4e04-4f12-8e5d-33e6e2385608.jpg",
        "fileSize":17321,"uri":"file:///data/user/0/com.ideaxecution.mobileapp/cache/rn_image_picker_lib_temp_418e6f93-4e04-4f12-8e5d-33e6e2385608.jpg"}]}
        */
        if (response.didCancel) {
          //reject('User cancelled image picker');
        } else if (response.errorCode) {
          if (response.errorCode === 'camera_unavailable') {
            Alert.alert('Error', 'Something went wrong!');
            return;
          }
          showMessage(
            'Camera permission is required',
            'Allow Camera Permission \n Settings > Peepal > Camera',
            'Settings',
            () => {
              Linking.openSettings();
            },
            'OK',
          );
        } else {
          if (response.assets && response.assets.length > 0) {
            const responseImageData:any = response.assets[0];
            const imageData = {
              height: responseImageData.height,
              width: responseImageData.width,
              type: responseImageData.type,
              name: responseImageData.fileName.replace(
                'rn_image_picker_lib_temp_',
                '',
              ),
              filesize: responseImageData.fileSize,
              uri:
                Platform.OS === 'android'
                  ? responseImageData.uri
                  : responseImageData.uri.replace('file://', ''),
            };
            callback(imageData);
          } else {
            callback(null);
          }
        }
      });
    }
  }
  if (index === 1) {
    let storagePermissionStatus:any = false;
    //then we have do the same for WRITE_EXTERNAL_STORAGE as
    let isStorageAuthorized = false;
    if (Platform.OS === 'android') {
      isStorageAuthorized = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!isStorageAuthorized) {
        storagePermissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }
    }

    if (
      isStorageAuthorized ||
      storagePermissionStatus ||
      Platform.OS === 'ios'
    ) {
      await launchImageLibrary(options, (response) => {
        consoleLog(
          'IXNUtils',
          'photoUpload',
          'launchImageLibrary->response',
          JSON.stringify(response),
        );
        /*
        launchImageLibrary->response:  {"assets":[{"height":1024,"width":512,"type":"image/png",
        "fileName":"rn_image_picker_lib_temp_1309853d-1eed-4b8e-8712-9ef50e800a1c.png",
        "fileSize":55580,"uri":"file:///data/user/0/com.ideaxecution.mobileapp/cache/rn_image_picker_lib_temp_1309853d-1eed-4b8e-8712-9ef50e800a1c.png"}]}

        */
        if (response.didCancel) {
        } else if (response.errorCode) {
          showMessage(
            'Read Storage permission is required',
            'Allow Read Storage Permission \n Settings > Peepal > Storage',
            'Settings',
            () => {
              Linking.openSettings();
            },
            'OK',
          );
        } else {
          if (response.assets && response.assets.length > 0) {
            const responseImageData:any = response.assets[0];
            const imageData = {
              height: responseImageData.height,
              width: responseImageData.width,
              type: responseImageData.type,
              name: responseImageData.fileName.replace(
                'rn_image_picker_lib_temp_',
                '',
              ),
              filesize: responseImageData.fileSize,
              uri:
                Platform.OS === 'android'
                  ? responseImageData.uri
                  : responseImageData.uri.replace('file://', ''),
            };
            callback(imageData);
          } else {
            callback(null);
          }
        }
      });
    }
  }
}