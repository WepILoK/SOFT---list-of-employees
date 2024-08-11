import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import fakeData from './employees.json'
import {ERole, IEmployee, IEmployeeState} from "./types.ts";

const initialState: IEmployeeState = {
    employees: []
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        getEmployeesData: (state) => {
            state.employees = fakeData
        },
        addEmployee: (state, action: PayloadAction<IEmployee>) => {
            state.employees = [action.payload, ...state.employees]
        },
        updateEmployee: (state, action: PayloadAction<IEmployee>) => {
            state.employees = state.employees.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                } else return item
            })
        },
        getFilteredEmployeesData: (state, action: PayloadAction<{role: ERole, isArchive: boolean}>) => {
            const {role, isArchive} = action.payload
            state.employees = fakeData
                .filter(item => (role ? item.role === role : true))
                .filter(item => (isArchive ? item.isArchive : true))
        },
    },

})

export const employeeReducer = employeeSlice.reducer

export const {
    getEmployeesData,
    addEmployee,
    updateEmployee,
    getFilteredEmployeesData,
} = employeeSlice.actions