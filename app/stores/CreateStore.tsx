import {applyMiddleware, compose} from 'redux';
import {configureStore, Reducer, Middleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: ['authReducer', 'startupReducer', 'userReducer'],
};

export default (rootReducer: Reducer, rootSaga: () => Generator) => {
  const middleware: Middleware[] = [];
  const enhancers: any[] = [];
  const devMode = process.env.NODE_ENV === 'development';
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // enhancers.push(applyMiddleware(...middleware));

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middleware),
    // preloadedState: {},
    // enhancers: compose(...enhancers),
  });
  const persistor: Persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};