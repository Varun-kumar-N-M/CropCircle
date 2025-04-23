import * as ActionTypes from '../actions/actionTypes';

export function verifyOTPRequest(signInData: any) {
  return {
    type: ActionTypes.VERIFY_OTP_REQUEST,
    signInData,
  };
}

export function verifyOTPSuccess(signInResponse: any) {
  return {
    type: ActionTypes.VERIFY_OTP_SUCCESS,
    params: signInResponse,
  };
}

export function verifyOTPError(signInErrorParams: any) {
  return {
    type: ActionTypes.VERIFY_OTP_FAILURE,
    params: signInErrorParams,
  };
}

export function loginMobileRequest(signUpData: any) {
  return {
    type: ActionTypes.LOGIN_MOBILE_REQUEST,
    signUpData,
  };
}

export function loginMobileSuccess(signUpResponse: any) {
  return {
    type: ActionTypes.LOGIN_MOBILE_SUCCESS,
    params: signUpResponse,
  };
}

export function loginMobileError(signUpErrorParams: any) {
  return {
    type: ActionTypes.LOGIN_MOBILE_FAILURE,
    params: signUpErrorParams,
  };
}

export function resendOTPRequest(signUpData: any) {
  return {
    type: ActionTypes.RESEND_OTP_REQUEST,
    signUpData,
  };
}

export function resendOTPSuccess(signUpResponse: any) {
  return {
    type: ActionTypes.RESEND_OTP_SUCCESS,
    params: signUpResponse,
  };
}

export function resendOTPError(signUpErrorParams: any) {
  return {
    type: ActionTypes.RESEND_OTP_FAILURE,
    params: signUpErrorParams,
  };
}

export function getProfileDataRequest(userInfo: any) {
  return {
    type: ActionTypes.GET_PROFILE_DATA_REQUEST,
    userInfo,
  };
}

export function getProfileDataSuccess(response: any) {
  return {
    type: ActionTypes.GET_PROFILE_DATA_SUCCESS,
    response,
  };
}

export function getProfileDataFailure(error: any) {
  return {
    type: ActionTypes.GET_PROFILE_DATA_FAILURE,
    error,
  };
}

export function updateProfiledataRequest(userInfo: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_DATA_REQUEST,
    userInfo,
  };
}

export function updateProfiledataSuccess(response: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_DATA_SUCCESS,
    response,
  };
}

export function updateProfiledataFailure(error: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_DATA_FAILURE,
    error,
  };
}

export function updateProfileImageRequest(userInfo: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_IMAGE_REQUEST,
    userInfo,
  };
}

export function updateProfileImageSuccess(response: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS,
    response,
  };
}

export function updateProfileImageFailure(error: any) {
  return {
    type: ActionTypes.UPDATE_PROFILE_IMAGE_FAILURE,
    error,
  };
}

export function refreshTokenRequest(userInfo: any) {
  return {
    type: ActionTypes.REFRESH_TOKEN_REQUEST,
    userInfo,
  };
}
export function refreshTokenSuccess(response: any) {
  return {
    type: ActionTypes.REFRESH_TOKEN_REQUEST,
    response,
  };
}
export function refreshTokenFailure(error: any) {
  return {
    type: ActionTypes.REFRESH_TOKEN_REQUEST,
    error,
  };
}


export function getShopDataRequest(userInfo: any) {
  return {
    type: ActionTypes.GET_SHOP_DETAILS_REQUEST,
    userInfo,
  };
}

export function getShopDataSuccess(response: any) {
  return {
    type: ActionTypes.GET_SHOP_DETAILS_SUCCESS,
    response,
  };
}

export function getShopDataFailure(error: any) {
  return {
    type: ActionTypes.GET_SHOP_DETAILS_FAILURE,
    error,
  };
}

export function updateShopdataRequest(userInfo: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_DETAILS_REQUEST,
    userInfo,
  };
}

export function updateShopdataSuccess(response: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_DETAILS_SUCCESS,
    response,
  };
}

export function updateShopdataFailure(error: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_DETAILS_FAILURE,
    error,
  };
}

export function updateShopImageRequest(userInfo: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_IMAGE_REQUEST,
    userInfo,
  };
}

export function updateShopImageSuccess(response: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_IMAGE_SUCCESS,
    response,
  };
}

export function updateShopImageFailure(error: any) {
  return {
    type: ActionTypes.UPLOAD_SHOP_IMAGE_FAILURE,
    error,
  };
}



