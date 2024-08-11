import {
    Avatar,
    Box, Button,
    Checkbox, Divider,
    FormControlLabel,
    IconButton, List, ListItem, ListItemAvatar, ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import styles from "./homePage.module.scss"
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../shared/lib/store";
import {selectIEmployees, ERole, getEmployeesData, getFilteredEmployeesData} from "../../../entities/employee";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {Link, useNavigate} from "react-router-dom";

export const HomePage = () => {
    const data = useAppSelector(selectIEmployees)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState({
        role: "",
        isArchive: false
    })
    const [sortSettings, setSortSettings] = useState({
        key: "",
        order: "ASC"
    })

    const handleFilterChange = (event: SelectChangeEvent<ERole>) => {
        dispatch(getFilteredEmployeesData(
            {...filterValues, role: event.target.value}
        ))
        setFilterValues(prevState => ({
            ...prevState,
            role: event.target.value
        }));
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getFilteredEmployeesData())
        setFilterValues(prevState => ({
            ...prevState,
            isArchive: event.target.checked
        }));
    }

    const handleSortKeyChange = (event: SelectChangeEvent<ERole>) => {
        setSortSettings(prevState => ({
            ...prevState,
            key: event.target.value
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
                        onChange={handleFilterChange}
                    >
                        <MenuItem value={""}>Все</MenuItem>
                        {Object.keys(ERole).map((item) => <MenuItem key={item} value={item}>{ERole[item]}</MenuItem>)}
                    </Select>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className={styles.checkbox}
                                checked={filterValues.isArchive}
                                onChange={handleCheckboxChange}/>
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
                            value={sortSettings.key}
                            displayEmpty
                            onChange={handleSortKeyChange}
                        >
                            <MenuItem value={""}>Все</MenuItem>
                            <MenuItem value={"name"}>По имени</MenuItem>
                            <MenuItem value={"birthday"}>По дате рожения</MenuItem>
                        </Select>
                        <IconButton
                            onClick={() => {
                                setSortSettings(prevState => ({
                                    ...prevState,
                                    order: prevState.order === "ASC" ? "DESC" : "ASC"
                                }));
                            }}
                        >
                            {sortSettings.order === "ASC"
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
                                        navigate(`/soft/${item.id}`)
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