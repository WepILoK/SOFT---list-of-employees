import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import styles from "./homePage.module.scss"
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../shared/lib/redux.ts";
import {
    ERole,
    ESortType,
    getEmployeesData,
    getFilteredEmployeesData, getSortedEmployeesData,
    IFilterValues,
    ISortValues,
    selectIEmployees
} from "../../../entities/employee";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Link, useNavigate} from "react-router-dom";

export const HomePage = () => {
    const data = useAppSelector(selectIEmployees)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState<IFilterValues>({
        role: "",
        isArchive: false
    })
    const [sortValues, setSortValues] = useState<ISortValues>({
        type: "",
        order: "ASC"
    })

    const handleFilterRoleChange = (event: SelectChangeEvent<ERole>) => {
        dispatch(getFilteredEmployeesData({
            ...filterValues,
            role: event.target.value as ERole
        }))
        setFilterValues(prevState => ({
            ...prevState,
            role: event.target.value as ERole
        }));
    }

    const handleFilterCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getFilteredEmployeesData({
            ...filterValues,
            isArchive: event.target.checked
        }))
        setFilterValues(prevState => ({
            ...prevState,
            isArchive: event.target.checked
        }));
    }

    const handleSortTypeChange = (event: SelectChangeEvent<ESortType>) => {
        dispatch(getSortedEmployeesData({
            ...sortValues,
            type: event.target.value as ESortType
        }))
        setSortValues(prevState => ({
            ...prevState,
            type: event.target.value as ESortType
        }));
    }
    const handleSortOrderChange = () => {
        dispatch(getSortedEmployeesData({
            ...sortValues,
            order: sortValues.order === "ASC" ? "DESC" : "ASC"
        }))
        setSortValues(prevState => ({
            ...prevState,
            order: prevState.order === "ASC" ? "DESC" : "ASC"
        }));
    }

    useEffect(() => {
        dispatch(getEmployeesData())
    }, []);

    return (
        <Box className={styles.homePage}>
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
                        value={filterValues.role}
                        displayEmpty
                        onChange={handleFilterRoleChange}
                    >
                        <MenuItem value={""}>Все</MenuItem>
                        {Object.keys(ERole).map((item) => <MenuItem key={item} value={item}>{ERole[item]}</MenuItem>)}
                    </Select>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={styles.checkbox}
                                checked={filterValues.isArchive}
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
                            value={sortValues.type}
                            displayEmpty
                            onChange={handleSortTypeChange}
                        >
                            <MenuItem value={""}>Выкл</MenuItem>
                            {Object.keys(ESortType).map((item) => <MenuItem key={item} value={item}>{ESortType[item]}</MenuItem>)}
                        </Select>
                        <IconButton
                            onClick={handleSortOrderChange}
                        >
                            {sortValues.order === "ASC"
                                ? <ArrowDownwardIcon/>
                                : <ArrowUpwardIcon/>
                            }
                        </IconButton>
                    </Box>

                </Box>
                <Box className={styles.addButton}>
                    <Link to={""}>
                        <Button variant="contained" fullWidth>
                            Добавить сотрудника
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box className={styles.listLayout}>
                <List className={styles.list}>
                    {data.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem
                                    className={styles.item}
                                    onClick={() => {
                                        navigate(`/soft-list-of-employees/${item.id}`)
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar alt=""/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{display: 'block'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Должность: {ERole[item.role]}
                                                </Typography>
                                                <Typography
                                                    sx={{display: 'block'}}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    День рождения: {item.birthday}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                            </React.Fragment>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}