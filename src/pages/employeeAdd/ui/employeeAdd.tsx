import {Box, Button} from "@mui/material";
import {EmployeeForm} from "../../../features/employeeForm";
import {useAppDispatch} from "../../../shared/lib/redux.ts";
import {addEmployee} from "../../../entities/employee";
import styles from "../../employeeEdit/ui/employeeEdit.module.scss";
import {GoBackButton} from "../../../shared/ui/goBackButton";
import {useNavigate} from "react-router-dom";

export const EmployeeAdd = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onSubmit = (data) => {
        dispatch(addEmployee(data))
        navigate(`/soft-list-of-employees/${data.id}`, {replace: true})
    }

    return (
        <Box className={styles.editLayout}>
            <GoBackButton/>
            <EmployeeForm onSubmit={onSubmit}/>
            <Box className={styles.button}>
                <Button
                    form={"employeeForm"}
                    type="submit"
                    variant="contained"
                >
                    Добавить
                </Button>
            </Box>
        </Box>
    )
}