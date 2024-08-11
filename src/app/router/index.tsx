import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../layout";
import {HomePage} from "../../pages/homePage";

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
                element: <>fwaffwaf</>
            }
        ]
    }
])