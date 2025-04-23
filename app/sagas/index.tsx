import { all } from 'redux-saga/effects';
import { watchAuth } from './authSagas';
import startupSaga from './startupSaga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    startupSaga(),
  ]);
}