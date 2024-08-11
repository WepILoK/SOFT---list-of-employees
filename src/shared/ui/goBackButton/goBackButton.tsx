import {Box, Button} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import styles from "./goBackButton.module.scss"

export const GoBackButton = () => {
    const navigate = useNavigate()
    return (
        <Box className={styles.backButton}>
            <Button
                variant="contained"
                onClick={() => {
                    navigate(-1)
                }}
                startIcon={<ArrowBackIcon/>}
            >
                Назад
            </Button>
        </Box>
    )
}