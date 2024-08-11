import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../layout";
import {HomePage} from "../../pages/homePage";

export const router = createBrowserRouter([
    {
        path: "/soft/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/soft/:id",
                element: <>fwaffwaf</>
            }
        ]
    }
])