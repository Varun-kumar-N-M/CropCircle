import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  inactiveTimestamp: null,
  position:null,
  savedContactList: null,
  savedContactListError: null,
};

function commonReducer(state = initialState, action:any) {
  switch (action.type) {
    case ActionTypes.SET_INACTIVE_TIMESTAMP:
      return {
        ...state,
        inactiveTimestamp: action.timestamp,
      };
    default:
      return {
        ...state,
      };
  }
}

export default commonReducer;
