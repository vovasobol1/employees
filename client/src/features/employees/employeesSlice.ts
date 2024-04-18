import {Employee} from "@prisma/client";
import {createSlice} from "@reduxjs/toolkit";
import {employeesApi} from "../../app/servises/employees";
import {RootState} from "../../app/store";

interface InitialState {
    employees : Employee[] | null
}

const initialState : InitialState = {
    employees: null ,
}

const slice = createSlice({
    name : 'Employees' ,
    initialState ,
    reducers: {
        logout : () => initialState ,
    },
    extraReducers : (builder) => {
        // если getAllEmployees завершится успешно
        builder
            .addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled , (state, action) => {
                state.employees = action.payload
            })
    }
})

export default slice.reducer

export const selectEmployees = (state : RootState) => state.employees

