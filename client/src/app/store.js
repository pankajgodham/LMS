import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { CourceApi } from "@/features/api/courceApi.js";
export const appStore=configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware)=>defaultMiddleware().concat(authApi.middleware,CourceApi.middleware)
});

const initializeApp=async()=>{
await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp(); 