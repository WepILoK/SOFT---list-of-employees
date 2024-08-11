import styles from "./employeeForm.module.scss"
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select, Snackbar, SnackbarCloseReason,
    TextField
} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {EmployeeFormDataType, employeeFormSchema} from "../model/schema.ts";
import {InputPhoneNumberMaks} from "../../../shared/ui/inputPhoneNumberMaks";
import {InputDateRUMask} from "../../../shared/ui/inputDateRUMask";
import {ERole, IEmployee} from "../../../entities/employee";
import React, {SyntheticEvent, useState} from "react";

interface IEmployeeForm {
    employeeItem?: IEmployee
    onSubmit: (data: EmployeeFormDataType) => void
}

export const EmployeeForm: React.FC<IEmployeeForm> = ({employeeItem, onSubmit}) => {
    const [open, setOpen] = useState(false)
    const {control, handleSubmit, setValue} = useForm({
        resolver: yupResolver(employeeFormSchema),
        mode: 'onSubmit',
        defaultValues: employeeItem
            ? employeeItem
            : {
                id: Date.now(),
                isArchive: false,
                role: "cook"
            }
    })

    const onSubmitData = (data) => {
        onSubmit(data)
        setOpen(true);
    }

    const handleClose = (
        event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitData)}
            id="employeeForm"
            className={styles.formLayout}
        >
            <Snackbar open={open}
                      autoHideDuration={3000}
                      onClose={handleClose}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Данные успешно сохранены!
                </Alert>
            </Snackbar>
            <Controller
                name="name"
                control={control}
                render={({field, fieldState, formState}) => (
                    <TextField
                        helperText={fieldState.error ? fieldState.error.message : null}
                        size="small"
                        error={!!fieldState.error}
                        onChange={field.onChange}
                        value={field.value}
                        type={"text"}
                        fullWidth
                        label={"Имя сотрудника"}
                        variant="outlined"
                        sx={{pb: "12px"}}
                    />
                )}
            />
            <Controller
                name="phone"
                control={control}
                render={({field, fieldState, formState}) => (
                    <TextField
                        helperText={fieldState.error ? fieldState.error.message : null}
                        size="small"
                        error={!!fieldState.error}
                        onChange={field.onChange}
                        value={field.value}
                        type={"text"}
                        fullWidth
                        label={"Телефон"}
                        variant="outlined"
                        sx={{pb: "12px"}}
                        InputProps={{
                            inputComponent: InputPhoneNumberMaks as any,
                        }}
                    />
                )}
            />
            <Controller
                name="birthday"
                control={control}
                render={({field, fieldState, formState}) => (
                    <TextField
                        helperText={fieldState.error ? fieldState.error.message : null}
                        size="small"
                        error={!!fieldState.error}
                        onChange={field.onChange}
                        value={field.value}
                        type={"text"}
                        autoComplete={"off"}
                        fullWidth
                        label={"Дата рождения"}
                        variant="outlined"
                        sx={{pb: "12px"}}
                        InputProps={{
                            inputComponent: InputDateRUMask as any,
                        }}
                    />
                )}
            />
            <Controller
                name="role"
                control={control}
                render={({field, fieldState, formState}) => (
                    <FormControl className={styles.select} fullWidth size="small">
                        <InputLabel id="role-label">Должность</InputLabel>
                        <Select
                            labelId="role-label"
                            size="small"
                            value={field.value}
                            error={!!fieldState.error}
                            label="Должность"
                            onChange={field.onChange}
                        >
                            {Object.keys(ERole).map((item) =>
                                <MenuItem
                                    key={item}
                                    value={item}>
                                    {ERole[item]}
                                </MenuItem>
                            )}
                        </Select>
                        <FormHelperText
                            hidden={!fieldState.error}
                            error={!!fieldState.error}
                        >
                            {fieldState.error ? fieldState.error.message : null}
                        </FormHelperText>
                    </FormControl>
                )}
            />
            <Controller
                name="isArchive"
                control={control}
                render={({field, fieldState, formState}) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={styles.checkbox}
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        }
                        label="В архиве"
                    />
                )}
            />
        </form>
    )
}