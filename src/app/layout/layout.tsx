import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import styles from "./layout.module.scss"
import {useAppDispatch} from "../../shared/lib/redux.ts";
import {useEffect} from "react";
import {getEmployeesData} from "../../entities/employee";

export const Layout = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getEmployeesData())
    }, []);

    return (
        <Container className={styles.layout}>
            <Outlet/>
        </Container>
    )
}