import {Alert, Box, Button, Snackbar, SnackbarCloseReason} from "@mui/material";
import {EmployeeForm} from "../../../features/employeeForm";
import {GoBackButton} from "../../../shared/ui/goBackButton";
import {useAppDispatch, useAppSelector} from "../../../shared/lib/redux.ts";
import {selectIEmployees, updateEmployee} from "../../../entities/employee";
import {useParams} from "react-router-dom";
import styles from "./employeeEdit.module.scss"
import {SyntheticEvent, useState} from "react";

export const EmployeeEdit = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectIEmployees).find((item) => item.id === +id)

    const onSubmit = (data) => {
        dispatch(updateEmployee(data))
    }

    return (
        <Box className={styles.editLayout}>
            <GoBackButton/>
            {!!data && <EmployeeForm employeeItem={data} onSubmit={onSubmit}/> }
            <Box className={styles.button}>
                <Button
                    form={"employeeForm"}
                    type="submit"
                    variant="contained"
                >
                    Сохранить
                </Button>
            </Box>

        </Box>
    )
}