import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  startupData: null,
  error: null,
};

function startupReducer(state = initialState, action:any) {
  switch (action.type) {
    case ActionTypes.GET_STARTUP_REQUEST:
      return {
        ...state,
        startupData: null,
        error: null,
      };
    case ActionTypes.GET_STARTUP_SUCCESS:
      return {
        ...state,
        startupData: action.startupData,
        error: null,
      };
    case ActionTypes.GET_STARTUP_FAILURE:
      return {
        ...state,
        startupData: null,
        error: JSON.parse(action.error),
      };
    default:
      return {
        ...state,
      };
  }
}

export default startupReducer;
