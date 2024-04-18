import {createListenerMiddleware} from "@reduxjs/toolkit";
import {authApi} from "../app/servises/auth";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled ,
    effect : async (action , listenerApi) =>{
        listenerApi.cancelActiveListeners()
        //если есть токен то запишем его в локал сторадж
        if (action.payload.token){
            localStorage.setItem('token' , action.payload.token )
        }
    }
})