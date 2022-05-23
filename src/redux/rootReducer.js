import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import orderReducer from './slices/order';
import userReducer from './slices/user';
import driverReducer from './slices/driver';
import busReducer from './slices/bus';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  order: orderReducer,
  user: userReducer,
  driver: driverReducer,
  bus: busReducer,
});

export { rootPersistConfig, rootReducer };
