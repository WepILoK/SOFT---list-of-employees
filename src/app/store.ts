import {configureStore} from "@reduxjs/toolkit";
import {employeeReducer} from "../entities/employee";

const store = configureStore({
    reducer: employeeReducer
})

export default store