import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root/Root";
import Login from "../pages/Login/Login";
import Regester from "../pages/regester/Regester";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/regester',
                element: <Regester />
            }
        ]
    }
])

export default Router;