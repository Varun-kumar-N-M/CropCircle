import * as ActionTypes from '../actions/actionTypes';

export function setInactiveTimestamp(timestamp: number) {
  return {
    type: ActionTypes.SET_INACTIVE_TIMESTAMP,
    timestamp: timestamp,
  };
}

