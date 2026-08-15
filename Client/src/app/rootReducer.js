import {combineReducers} from '@reduxjs/toolkit';
import {authapi} from '../features/api/authapi.js';
import authreducer from '../features/authslice.js';
import { courseApi } from '@/features/api/courseApi.js';
import { purchaseApi } from '@/features/api/purchaseApi.js';
import { courseProgressApi } from '@/features/api/courseProgressApi.js';
import { aiApi } from "@/features/api/aiApi";

const rootreducer = combineReducers({
    auth:authreducer,
     [courseApi.reducerPath]: courseApi.reducer,
    [authapi.reducerPath]: authapi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
});

export default rootreducer;
