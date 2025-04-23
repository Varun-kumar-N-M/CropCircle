import { combineReducers } from 'redux';
import authReducer from './authReducer';
import createStore from '../stores/CreateStore';
import userReducer from './userReducer';
import commonReducer from './commonReducer';
import startupReducer from './startupReducer';

import rootSaga from '../sagas';

export default () => {
   const rootReducer = combineReducers({
   authReducer,
   userReducer,
   commonReducer,
   startupReducer,
});

return createStore(rootReducer, rootSaga)
};
