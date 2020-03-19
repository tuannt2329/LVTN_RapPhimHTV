import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['loginIn'],
  blacklist: ['signupIn', 'forgotIn'], // which reducer want to store
  // stateReconciler: autoMergeLevel2,
};
const middlewares = [thunk];
if (__DEV__) {
  middlewares.push(createLogger());
}
const enhancer = applyMiddleware(...middlewares);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = createStore(persistedReducer, undefined, enhancer);
export const persistor = persistStore(store);

//end persist

// export default function configureStore(initialState) {
//   const store = createStoreWithMiddleware(rootReducer, initialState);
//   return store;
// }
