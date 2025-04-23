export const Environments = {
  dev: 0,
  stage: 1,
  prod: 2,
};

export const envName = (env) => {
  var name = '';
  switch (env) {
    case Environments.dev:
      name = 'Dev';
      break;
    case Environments.stage:
      name = 'Stage';
      break;
    case Environments.prod:
      name = 'Prod';
      break;
    default:
      name = 'Prod';
  }
  return name;
};

var _APP_ENV = Environments.dev;

export const updateAppEnv = env => {
  switch (env) {
    case Environments.dev:
      _APP_ENV = Environments.dev;
      break;
    case Environments.stage:
      _APP_ENV = Environments.stage;
      break;
    case Environments.prod:
      _APP_ENV = Environments.prod;
      break;
    default:
      _APP_ENV = Environments.prod;
  }
};

export const APP_ENV = () => {
  return _APP_ENV;
};

var _userToken:string| null = null;
var _isUserLoggedIn = false;
export const updateUserToken = (userTokenStr = '{}') => {
  if (userTokenStr === '') {
    userTokenStr = '{}';
  }
  _userToken = JSON.parse(userTokenStr);
  if (_userToken?.data) {
    _isUserLoggedIn = true;
  } else {
    _isUserLoggedIn = false;
  }
};

export const setIsUserLoggedIn = (loginStatus = false) => {
  _isUserLoggedIn = loginStatus;
};

export const userToken = () => {
  return _userToken;
};

export const isUserLoggedIn = () => {
  return _isUserLoggedIn;
};

var _startupParamsFile = {};
export const updateStartupParamsFile = (fileName:any) => {
  if (fileName) {
    _startupParamsFile = fileName;
  }
};

export const startupParamsFile = () => {
  return _startupParamsFile;
};

export var _appVersion = '';
export const updateAppVersion = (v:any) => {
  if (v) {
    _appVersion = v;
  }
};
export const appVersion = () => {
  return _appVersion;
};
var _deviceInfo = {};
export const updateDeviceInfo = (di:any) => {
  if (di) {
    _deviceInfo = di;
  }
};
export const deviceInfo = () => {
  return _deviceInfo;
};