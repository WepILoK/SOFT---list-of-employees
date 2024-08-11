import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import styles from "./layout.module.scss"

export const Layout = () => {

    return (
        <Container className={styles.layout}>
            <Outlet/>
        </Container>
    )
}