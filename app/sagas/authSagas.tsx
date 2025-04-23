import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as ActionTypes from '../actions/actionTypes';
import {
  verifyOTPSuccess,
  verifyOTPError,
  loginMobileSuccess,
  loginMobileError,
  resendOTPSuccess,
  resendOTPError,
  updateProfileImageSuccess,
  updateProfileImageFailure,
  updateProfiledataRequest,
  getProfileDataFailure,
  getProfileDataSuccess,
  updateProfiledataFailure,
  updateProfiledataSuccess,
  updateShopImageSuccess,
  updateShopdataSuccess,
  updateShopdataFailure,
  getShopDataSuccess,
  getShopDataFailure,
  updateShopImageFailure,
} from '../actions/authActions';
import * as ApiConfig from '../services/config';
import * as AppConfig from '../common/AppConfig';
import {CommonFetch,uploadFile} from '../services/apiService';
import * as CONST from '../utils/Constants';

const opts = {
  method: '',
  url: '',
  body: null,
  useAccessToken: false,
  shouldAddGetParams: true,
};

function* verifyOTP(action: any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_TO_VERIFY;
    const signInResponse = yield call(CommonFetch, action.signInData, opts);
    yield put(verifyOTPSuccess(signInResponse));
  } catch (error:any) {
    yield put(verifyOTPError(error?.message));
  }
}

function* loginMobile(action: any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_LOGIN;
    const signUpResponse = yield call(CommonFetch, action.signUpData, opts);
    yield put(loginMobileSuccess(signUpResponse));
  } catch (error:any) {
    yield put(loginMobileError(error?.message));
  }
}

function* resendOTP(action: any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_TO_RESENDOTP;
    const response = yield call(CommonFetch, action.signUpData, opts);
    yield put(resendOTPSuccess(response));
  } catch (error:any) {
    yield put(resendOTPError(error?.message));
  }
}

function* updateUserInfo(action:any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_USER_PROFILE_DATA;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.userInfo, opts);
    yield put(updateProfiledataSuccess(response));
  } catch (error:any) {
    yield put(updateProfiledataFailure(error?.message));
  }
}


function* getProfileDetails(action:any) {
  try {
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_GET_PROFILE_DATA;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.userInfo, opts);

    yield put(getProfileDataSuccess(response));
  } catch (error:any) {
    yield put(getProfileDataFailure(error?.message));
  }
}

function* updateUserImage(action:any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_USER_IMAGE;
    opts.useAccessToken = true;
    const response = yield call(
      uploadFile,
      action.userInfo,
      opts,
    );
    yield put(updateProfileImageSuccess(response));
  } catch (error:any) {
    yield put(updateProfileImageFailure(error?.message));
  }
}


function* updateShopInfo(action:any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_SHOP_PROFILE_DATA;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.userInfo, opts);
    yield put(updateShopdataSuccess(response));
  } catch (error:any) {
    yield put(updateShopdataFailure(error?.message));
  }
}


function* getShopDetails(action:any) {
  try {
    opts.method = CONST.GET_API;
    opts.url = ApiConfig.API_METHOD_GET_SHOP_DATA;
    opts.useAccessToken = true;
    const response = yield call(CommonFetch, action.userInfo, opts);

    yield put(getShopDataSuccess(response));
  } catch (error:any) {
    yield put(getShopDataFailure(error?.message));
  }
}

function* updateShopImage(action:any) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_UPDATE_SHOP_IMAGE;
    opts.useAccessToken = true;
    const response = yield call(
      uploadFile,
      action.userInfo,
      opts,
    );
    yield put(updateShopImageSuccess(response));
  } catch (error:any) {
    yield put(updateShopImageFailure(error?.message));
  }
}

export function* watchAuth() {
  yield takeEvery(ActionTypes.VERIFY_OTP_REQUEST, verifyOTP);
  yield takeEvery(ActionTypes.LOGIN_MOBILE_REQUEST, loginMobile);
  yield takeEvery(ActionTypes.RESEND_OTP_REQUEST, resendOTP);
  yield takeEvery(ActionTypes.UPDATE_PROFILE_IMAGE_REQUEST, updateUserImage);
  yield takeEvery(ActionTypes.UPDATE_PROFILE_DATA_REQUEST, updateUserInfo);
  yield takeEvery(ActionTypes.GET_PROFILE_DATA_REQUEST, getProfileDetails);
  yield takeEvery(ActionTypes.UPLOAD_SHOP_IMAGE_REQUEST, updateShopImage);
  yield takeEvery(ActionTypes.UPLOAD_SHOP_DETAILS_REQUEST, updateShopInfo);
  yield takeEvery(ActionTypes.GET_SHOP_DETAILS_REQUEST, getShopDetails);
}
