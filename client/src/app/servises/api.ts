import { createApi, fetchBaseQuery , retry} from '@reduxjs/toolkit/query/react'
import {RootState} from "../store";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8000/api',
    prepareHeaders(headers , {getState}){
        // записываем токен в переменную и получаем его либо из стейта , либо из localstorage
        const token = (getState() as RootState).auth.user?.token ||
            localStorage.getItem('token')

        if (token && token !== null){
            headers.set('authorization' , `Bearer ${token}`)
        }
    },
})

const baseQueryWithRetry = retry(baseQuery , {maxRetries : 1 })

export const api = createApi({
    reducerPath : 'splitApi' ,
    baseQuery: baseQueryWithRetry ,
    refetchOnMountOrArgChange : true ,
    endpoints: ()=>({}) ,
})