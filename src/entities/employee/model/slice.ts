import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import fakeData from './employees.json'
import {IEmployee, IEmployeeState, IFilterValues, ISortValues} from "./types.ts";
import {dateFormat} from "../../../shared/lib/dateFormat.ts";

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
                if (item.id === action.payload.id) {
                    return action.payload
                } else return item
            })
        },
        getFilteredEmployeesData: (state, action: PayloadAction<IFilterValues>) => {
            const {role, isArchive} = action.payload
            state.employees = fakeData
                .filter(item => (role ? item.role === role : true))
                .filter(item => (isArchive ? item.isArchive : true))
        },
        getSortedEmployeesData: (state, action: PayloadAction<ISortValues>) => {
            const {type, order} = action.payload
            let newData = [...fakeData]
            if (type === "name") {
                if (order === "ASC") {
                    newData.sort((a, b) => a.name.localeCompare(b.name))
                } else {
                    newData.sort((a, b) => a.name.localeCompare(b.name)).reverse()
                }
            } else if (type === "birthday") {
                if (order === "ASC") {
                    newData.sort((a, b) => new Date(dateFormat(a.birthday)) - new Date(dateFormat(b.birthday)))
                } else {
                    newData.sort((a, b) => new Date(dateFormat(a.birthday)) - new Date(dateFormat(b.birthday)))
                        .reverse()
                }
            } else {
                newData = fakeData
            }
            state.employees = newData
        },
    },

})

export const employeeReducer = employeeSlice.reducer

export const {
    getEmployeesData,
    addEmployee,
    updateEmployee,
    getFilteredEmployeesData,
    getSortedEmployeesData,
} = employeeSlice.actions