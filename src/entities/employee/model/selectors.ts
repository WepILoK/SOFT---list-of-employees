import {createSelector} from "@reduxjs/toolkit";

export const selectIEmployees = createSelector(
    (state: RootState) => state,
    (state: RootState) => state.employees
)
