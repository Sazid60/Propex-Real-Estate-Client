
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProperties from "../pages/AllPropertiesPage/AllProperties";
import DashboardLayout from "../layouts/DashboardLayout";

import UserProfile from "../pages/Dashboard/User/UserProfile";
import UserWishlist from "../pages/Dashboard/User/UserWishlist";
import UserProperty from "../pages/Dashboard/User/UserProperty";
import UserReviews from "../pages/Dashboard/User/UserReviews";
import AdProfile from "../pages/Dashboard/Admin/AdProfile";
import PropertyManage from "../pages/Dashboard/Admin/PropertyManage";
import UserManage from "../pages/Dashboard/Admin/UserManage";
import ReviewManage from "../pages/Dashboard/Admin/ReviewManage";
import AgentProfile from "../pages/Dashboard/Agent/AgentProfile";
import AddProperty from "../pages/Dashboard/Agent/AddProperty";
import MyAddedProperty from "../pages/Dashboard/Agent/MyAddedProperty";
import MySoldProperty from "../pages/Dashboard/Agent/MySoldProperty";
import Common from "../pages/Dashboard/Common";






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
        element: <DashboardLayout />,
        children: [
            {
                index:true,
                element: <Common></Common>,
            },
            // User Routes
            {
                path: 'user-profile',
                element: <UserProfile></UserProfile>,
            },
            {
                path: 'wishlist',
                element: <UserWishlist></UserWishlist>,
            },
            {
                path: 'property-bought',
                element: <UserProperty></UserProperty>,
            },
            {
                path: 'user-reviews',
                element: <UserReviews></UserReviews>
            },

            // Admin Routes
            {
                path: 'admin-profile',
                element: <AdProfile></AdProfile>,
            },
            {
                path: 'manage-properties',
                element: <PropertyManage></PropertyManage>,
            },
            {
                path: 'manage-users',
                element: <UserManage></UserManage>,
            },
            {
                path: 'manage-reviews',
                element: <ReviewManage></ReviewManage>,
            },

            // Agent Routes
            {
                path: 'agent-profile',
                element: <AgentProfile></AgentProfile>,
            },
            {
                path: 'add-property',
                element: <AddProperty></AddProperty>,
            },
            {
                path: 'my-added-property',
                element: <MyAddedProperty></MyAddedProperty>
            },
            {
                path: 'sold-properties',
                element: <MySoldProperty></MySoldProperty>,
            },
        ]

    },


])