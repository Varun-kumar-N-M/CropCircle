import * as ActionTypes from '../actions/actionTypes';

export function getStartupDataSuccess(startupData: any) {
  return {
    type: ActionTypes.GET_STARTUP_SUCCESS,
    startupData,
  };
}

export function getStartupDataFailure(error: any) {
  return {
    type: ActionTypes.GET_STARTUP_FAILURE,
    error,
  };
}

export function getStartupData(params: any) {
  return {
    type: ActionTypes.GET_STARTUP_REQUEST,
    params: params,
  };
}