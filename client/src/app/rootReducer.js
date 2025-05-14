import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { authApi } from '@/features/api/authApi';
import { CourceApi } from '@/features/api/courceApi';
import { purchaseApi } from '@/features/api/purchaseApi';
import { courceProgressApi } from '@/features/api/courceProgressApi';

const rootReducer=combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [CourceApi.reducerPath]:CourceApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,  
    [courceProgressApi.reducerPath]:courceProgressApi.reducer,
    auth:authReducer
})
export default rootReducer;