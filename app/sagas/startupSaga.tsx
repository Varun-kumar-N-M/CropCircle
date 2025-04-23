import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getStartupDataSuccess, getStartupDataFailure } from '../actions/startupActions';
import * as ActionTypes from '../actions/actionTypes';
import { CommonFetch } from '../services/apiService';
import * as CONST from '../utils/Constants';
import * as ApiConfig from '../services/config';

// Define types for API options
interface FetchOptions {
  method: string;
  url: string | null;
  body: any;
  useAccessToken: boolean;
  shouldAddGetParams: boolean;
}

// Define types for action payload
interface GetStartupDataAction {
  type: typeof ActionTypes.GET_STARTUP_REQUEST;
  params: any; // Replace 'any' with a more specific type if available
}

const opts: FetchOptions = {
  method: '',
  url: null,
  body: null,
  useAccessToken: false,
  shouldAddGetParams: true,
};

function* getStartupData(action: GetStartupDataAction) {
  try {
    opts.method = CONST.POST_API;
    opts.url = ApiConfig.API_METHOD_STARTUP;
    const startupResponse: any = yield call(CommonFetch, action.params, opts); // Replace 'any' with the actual response type if known
    yield put(getStartupDataSuccess(startupResponse));
  } catch (error: any) {
    yield put(getStartupDataFailure(error?.message || 'Unknown error'));
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.GET_STARTUP_REQUEST, getStartupData);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
