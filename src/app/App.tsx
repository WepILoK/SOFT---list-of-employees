import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import styles from "./styles/styles.module.scss"
import store from "./store.ts";
import {Provider} from "react-redux";

export const App = () => {

    return (
        <div className={styles.app}>
            <Provider store={store}>
                <RouterProvider router={router}>

                </RouterProvider>
            </Provider>
        </div>
    )
}