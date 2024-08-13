import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import fakeData from './employees.json'
import {IEmployee, IEmployeeState, IToolBarValues} from "./types.ts";
import {dateFormat} from "../../../shared/lib/dateFormat.ts";

const initialState: IEmployeeState = {
    employees: [],
    copy: []
}

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        getEmployeesData: (state) => {
            state.employees = fakeData
            state.copy = fakeData
        },
        addEmployee: (state, action: PayloadAction<IEmployee>) => {
            const newData = [{...action.payload}, ...state.employees]
            state.employees = newData
            state.copy = newData
        },
        updateEmployee: (state, action: PayloadAction<IEmployee>) => {
            const newData = state.employees.map(item => {
                if (item.id === action.payload.id) {
                    return {...action.payload}
                } else return item
            })
            state.employees = newData
            state.copy = newData
        },
        getSortedAndFilteredEmployeesData: (state, action: PayloadAction<IToolBarValues>) => {
            const {type, order, isArchive, role} = action.payload
            let newData = [...state.copy]
                .filter(item => (role ? item.role === role : true))
                .filter(item => (isArchive ? item.isArchive : true))
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
    getSortedAndFilteredEmployeesData,
} = employeeSlice.actions