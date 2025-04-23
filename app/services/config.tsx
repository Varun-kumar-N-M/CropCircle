export const baseURL = {
  dev: 'https://dev-pt.appbrainz.com/',
  stage: 'https://stg-pt.appbrainz.com/',
  prod: 'https://kaamkaaz.appbrainz.com/',
};

export const API_METHOD_STARTUP = 'api/startup';
export const API_METHOD_LOGIN = 'api/auth/signup';
export const API_METHOD_TO_VERIFY = 'api/auth/verify-otp';
export const API_METHOD_TO_RESENDOTP = 'api/auth/resend-otp';
export const API_METHOD_UPDATE_USER_PROFILE_DATA='api/auth/updateFirstLastName';
export const API_METHOD_GET_PROFILE_DATA='api/auth/profile';
export const API_METHOD_UPDATE_USER_IMAGE='api/auth/uploadProfileImage?profile_image';
export const API_METHOD_UPDATE_SHOP_PROFILE_DATA ='/api/shop/update-shop-details';
export const API_METHOD_GET_SHOP_DATA ='/api/shop/shop-details';
export const API_METHOD_UPDATE_SHOP_IMAGE='/api/shop/upload-shop-image';

export let API_ENDPOINT = baseURL.dev;

export type EndpointType = 0 | 1 | 2 | string;

export const updateApiEndpoint = (endpoint: EndpointType): void => {
  if (endpoint === 0) {
    API_ENDPOINT = baseURL.dev;
  } else if (endpoint === 1) {
    API_ENDPOINT = baseURL.stage;
  } else if (endpoint === 2) {
    API_ENDPOINT = baseURL.prod;
  } else if (endpoint) {
    API_ENDPOINT = endpoint;
  }
};
