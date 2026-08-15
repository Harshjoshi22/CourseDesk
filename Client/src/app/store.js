import {configureStore} from '@reduxjs/toolkit';
import rootreducer from './rootReducer.js';
import { authapi } from '@/features/api/authapi.js';
import { courseApi } from '@/features/api/courseApi.js';
import { purchaseApi } from '@/features/api/purchaseApi.js';
import { courseProgressApi } from '@/features/api/courseProgressApi.js';
import { aiApi } from "@/features/api/aiApi";
export const store = configureStore({
  reducer:rootreducer,  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authapi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware,aiApi.middleware), 
});
