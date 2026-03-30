import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";
import reduxStorage from "./storage";

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    REGISTER,
    PERSIST,
    PURGE,
    persistReducer,
    persistStore

} from 'redux-persist'



const pesistConfig ={
    key:'root',
    storage:reduxStorage,
    blacklist:[],
    whitelist:['game'],
    
}

const persistedReducer =persistReducer(pesistConfig, rootReducer)
export const store =configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[
                    FLUSH,
                    REHYDRATE,
                    REGISTER,PAUSE,
                    PURGE,
                    PERSIST
                ],  
            }
        })
})



export const persistor =persistStore(store)