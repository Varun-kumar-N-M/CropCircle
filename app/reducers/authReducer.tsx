import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  signInResponse: null,
  signInError: null,
  signUpResponse: null,
  signUpError: null,
  resendOTPResponse: null,
  resendOTPError: null,
  profileData: null,
  profileDataError: null,
  updatedProfileResponse: null,
  updatedProfileError: null,
  updateProfileImageResponse: null,
  updateProfileImageError: null,
  refreshTokenResponse: null,
  refreshTokenError: null,
  shopData: null,
  shopDataError: null,
  updatedshopDataResponse: null,
  updatedShopDataError: null,
  updateShopImageResponse: null,
  updateShopImageError: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.VERIFY_OTP_REQUEST:
      return {
        ...state,
        signInResponse: null,
        signInError: null,
        signUpResponse: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        signInResponse: action.params,
        signInError: null,
        signUpResponse: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.VERIFY_OTP_FAILURE:
      return {
        ...state,
        signInError: JSON.parse(action.params),
        signInResponse: null,
        signUpResponse: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.LOGIN_MOBILE_REQUEST:
      return {
        ...state,
        signInResponse: null,
        signInError: null,
        signUpResponse: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.LOGIN_MOBILE_SUCCESS:
      return {
        ...state,
        signInResponse: null,
        signUpResponse: action.params,
        signInError: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.LOGIN_MOBILE_FAILURE:
      return {
        ...state,
        signUpError: JSON.parse(action.params),
        signUpResponse: null,
        signInResponse: null,
        signInError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };

    case ActionTypes.RESEND_OTP_REQUEST:
      return {
        ...state,
        signInResponse: null,
        signInError: null,
        signUpResponse: null,
        signUpError: null,
        resendOTPResponse: null,
        resendOTPError: null,
      };
    case ActionTypes.RESEND_OTP_SUCCESS:
      return {
        ...state,
        signUpResponse: null,
        signInResponse: null,
        signInError: null,
        signUpError: null,
        resendOTPResponse: action.params,
        resendOTPError: null,
      };
    case ActionTypes.RESEND_OTP_FAILURE:
      return {
        ...state,
        signUpError: null,
        signInResponse: null,
        signInError: null,
        signUpResponse: null,
        resendOTPResponse: null,
        resendOTPError: JSON.parse(action.params),
      };

    case ActionTypes.GET_PROFILE_DATA_REQUEST:
      return {
        ...state,
        profileData: null,
        profileDataError: null,
      };
    case ActionTypes.GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        profileData: action.response,
        profileDataError: null,
      };
    case ActionTypes.GET_PROFILE_DATA_FAILURE:
      return {
        ...state,
        profileData: null,
        profileDataError: JSON.parse(action.error),
      };
    case ActionTypes.UPDATE_PROFILE_DATA_REQUEST:
      return {
        ...state,
        updatedProfileResponse: null,
        updatedProfileError: null,
        updateProfileImageResponse: null,
        updateProfileImageError: null,
      };
    case ActionTypes.UPDATE_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        updatedProfileResponse: action.response,
        updatedProfileError: null,
        updateProfileImageResponse: null,
        updateProfileImageError: null,
      };
    case ActionTypes.UPDATE_PROFILE_DATA_FAILURE:
      return {
        ...state,
        updatedProfileResponse: null,
        updatedProfileError: JSON.parse(action.error),
        updateProfileImageResponse: null,
        updateProfileImageError: null,
      };
    case ActionTypes.UPDATE_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        updateProfileImageResponse: null,
        updateProfileImageError: null,
      };
    case ActionTypes.UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        updateProfileImageError: null,
        updateProfileImageResponse: action.response,
      };
    case ActionTypes.UPDATE_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        updateProfileImageResponse: null,
        updateProfileImageError: JSON.parse(action.error),
      };
    case ActionTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        refreshTokenResponse: null,
        refreshTokenError: null,
      };
    case ActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshTokenResponse: action.response,
        refreshTokenError: null,
      };
    case ActionTypes.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        refreshTokenResponse: null,
        refreshTokenError: JSON.parse(action.error),
      };

    case ActionTypes.GET_SHOP_DETAILS_REQUEST:
      return {
        ...state,
        shopData: null,
        shopDataError: null,
      };
    case ActionTypes.GET_SHOP_DETAILS_SUCCESS:
      return {
        ...state,
        shopData: action.response,
        shopDataError: null,
      };
    case ActionTypes.GET_SHOP_DETAILS_FAILURE:
      return {
        ...state,
        shopData: null,
        shopDataError: JSON.parse(action.error),
      };
    case ActionTypes.UPLOAD_SHOP_DETAILS_REQUEST:
      return {
        ...state,
        updatedshopDataResponse: null,
        updatedShopDataError: null,
        updateShopImageResponse: null,
        updateShopImageError: null,
      };
    case ActionTypes.UPLOAD_SHOP_DETAILS_SUCCESS:
      return {
        ...state,
        updatedshopDataResponse: action.response,
        updatedShopDataError: null,
        updateShopImageResponse: null,
        updateShopImageError: null,
      };
    case ActionTypes.UPLOAD_SHOP_DETAILS_FAILURE:
      return {
        ...state,
        updatedshopDataResponse: null,
        updatedShopDataError: JSON.parse(action.error),
        updateShopImageResponse: null,
        updateShopImageError: null,
      };
    case ActionTypes.UPLOAD_SHOP_IMAGE_REQUEST:
      return {
        ...state,
        updateShopImageResponse: null,
        updateShopImageError: null,
      };
    case ActionTypes.UPLOAD_SHOP_IMAGE_SUCCESS:
      return {
        ...state,
        updateShopImageError: null,
        updateShopImageResponse: action.response,
      };
    case ActionTypes.UPLOAD_SHOP_IMAGE_FAILURE:
      return {
        ...state,
        updateShopImageError: null,
        updateProfileImageError: JSON.parse(action.error),
      };
    default:
      return state;
  }
};

export default authReducer;
