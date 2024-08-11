import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../layout";
import {HomePage} from "../../pages/homePage";
import {EmployeeEdit} from "../../pages/employeeEdit";
import {EmployeeAdd} from "../../pages/employeeAdd/ui/employeeAdd.tsx";

export const router = createBrowserRouter([
    {
        path: "/soft-list-of-employees/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/soft-list-of-employees/:id",
                element: <EmployeeEdit/>
            },
            {
                path: "/soft-list-of-employees/add",
                element: <EmployeeAdd/>
            }
        ]
    }
])