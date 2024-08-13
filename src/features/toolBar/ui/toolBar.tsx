import styles from "./toolBar.module.scss"
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {
    ERole,
    ESortType,
    getSortedAndFilteredEmployeesData,
    IToolBarValues
} from "../../../entities/employee";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch} from "../../../shared/lib/redux.ts";

export const ToolBar = () => {
    const dispatch = useAppDispatch()
    const [toolBarValues, setToolBarValues] = useState<IToolBarValues>({
        role: "",
        isArchive: false,
        type: "",
        order: "ASC"
    })

    const handleFilterRoleChange = (event: SelectChangeEvent<ERole>) => {
        dispatch(getSortedAndFilteredEmployeesData({
            ...toolBarValues,
            role: event.target.value as ERole
        }))
        setToolBarValues(prevState => ({
            ...prevState,
            role: event.target.value as ERole
        }));
    }

    const handleFilterCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSortedAndFilteredEmployeesData({
            ...toolBarValues,
            isArchive: event.target.checked
        }))
        setToolBarValues(prevState => ({
            ...prevState,
            isArchive: event.target.checked
        }));
    }

    const handleSortTypeChange = (event: SelectChangeEvent<ESortType>) => {
        dispatch(getSortedAndFilteredEmployeesData({
            ...toolBarValues,
            type: event.target.value as ESortType
        }))
        setToolBarValues(prevState => ({
            ...prevState,
            type: event.target.value as ESortType
        }));
    }
    const handleSortOrderChange = () => {
        dispatch(getSortedAndFilteredEmployeesData({
            ...toolBarValues,
            order: toolBarValues.order === "ASC" ? "DESC" : "ASC"
        }))
        setToolBarValues(prevState => ({
            ...prevState,
            order: prevState.order === "ASC" ? "DESC" : "ASC"
        }));
    }

    const leavePage = () => {
        dispatch(getSortedAndFilteredEmployeesData({
            role: "",
            isArchive: false,
            type: "",
            order: "ASC"
        }))
    }

    return (
        <Box className={styles.toolBar}>
            <Box className={styles.filter}>
                <Typography
                    className={styles.text}
                    variant="h5"
                >
                    Фильтры:
                </Typography>
                <Select
                    className={styles.select}
                    size="small"
                    value={toolBarValues.role}
                    displayEmpty
                    onChange={handleFilterRoleChange}
                >
                    <MenuItem value={""}>Все</MenuItem>
                    {Object.keys(ERole).map((item) =>
                        <MenuItem
                            key={item}
                            value={item}>
                            {ERole[item]}
                        </MenuItem>
                    )}
                </Select>
                <FormControlLabel
                    control={
                        <Checkbox
                            className={styles.checkbox}
                            checked={toolBarValues.isArchive}
                            onChange={handleFilterCheckboxChange}/>
                    }
                    label="В архиве"
                />
            </Box>
            <Box className={styles.sort}>
                <Typography
                    className={styles.text}
                    variant="h5"
                >
                    Сортировка:
                </Typography>
                <Box
                    className={styles.select}
                >
                    <Select
                        size="small"
                        fullWidth
                        value={toolBarValues.type}
                        displayEmpty
                        onChange={handleSortTypeChange}
                    >
                        <MenuItem value={""}>Выкл</MenuItem>
                        {Object.keys(ESortType).map((item) =>
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {ESortType[item]}
                            </MenuItem>
                        )}
                    </Select>
                    <IconButton
                        onClick={handleSortOrderChange}
                    >
                        {toolBarValues.order === "ASC"
                            ? <ArrowDownwardIcon/>
                            : <ArrowUpwardIcon/>
                        }
                    </IconButton>
                </Box>
            </Box>
            <Box className={styles.addButton}>
                <Link to={"/soft-list-of-employees/add"}
                      onClick={leavePage}
                >
                    <Button variant="contained">
                        Добавить сотрудника
                    </Button>
                </Link>
            </Box>
        </Box>

    )
}