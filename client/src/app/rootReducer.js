import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { authApi } from '@/features/api/authApi';
import { CourceApi } from '@/features/api/courceApi';

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [CourceApi.reducerPath]:CourceApi.reducer,
    auth:authReducer
})
export default rootReducer;