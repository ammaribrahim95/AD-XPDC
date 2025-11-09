import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import partsReducer from './partsSlice';
import supplierReducer from './supplierSlice';
import orderReducer from './orderSlice';
import reportReducer from './reportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    parts: partsReducer,
    suppliers: supplierReducer,
    orders: orderReducer,
    reports: reportReducer,
  },
});

export default store;
