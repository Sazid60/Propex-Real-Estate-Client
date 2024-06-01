
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProperties from "../pages/AllPropertiesPage/AllProperties";
import Dashboard from "../pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/all-properties',
                element: <AllProperties />,
            },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },


])