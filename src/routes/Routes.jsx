
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
import PropertyUpdate from "../pages/Dashboard/Agent/PropertyUpdate";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import AdvertiseProperty from "../pages/Dashboard/Admin/AdvertiseProperty";
import MakeOfferForm from "../pages/Dashboard/User/MakeOfferForm";
import RequestedProperty from "../pages/Dashboard/Agent/RequestedProperty";
import PaymentPage from "../pages/Dashboard/User/PaymentPage";
import UserRoute from "./UserRoute";






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
                element: <PrivateRoute><AllProperties /></PrivateRoute>,
            },
            {
                path: '/property-details/:id',
                element: <PrivateRoute><PropertyDetails /></PrivateRoute>,
            },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index:true,
                element: <PrivateRoute><Common></Common></PrivateRoute>,
            },
            // User Routes
            {
                path: 'user-profile',
                element: <UserRoute><UserProfile></UserProfile></UserRoute>,
            },
            {
                path: 'wishlist',
                element: <UserRoute><UserWishlist></UserWishlist></UserRoute>,
            },
            {
                path: 'property-bought',
                element: <UserRoute><UserProperty></UserProperty></UserRoute>,
            },
            {
                path: 'user-reviews',
                element: <UserRoute><UserReviews></UserReviews></UserRoute>
            },
            {
                path: 'wishlist/offer/:id',
                element: <UserRoute><MakeOfferForm></MakeOfferForm></UserRoute>
            },
            {
                path: 'property-bought/paymentPage/:id',
                element: <UserRoute><PaymentPage></PaymentPage></UserRoute>
            },

            // Admin Routes
            {
                path: 'admin-profile',
                element: <AdminRoute><AdProfile /></AdminRoute>,
            },
            {
                path: 'manage-properties',
                element: <AdminRoute><PropertyManage /></AdminRoute>,
            },
            {
                path: 'manage-users',
                element: <AdminRoute><UserManage /></AdminRoute>,
            },
            {
                path: 'manage-reviews',
                element: <AdminRoute><ReviewManage /></AdminRoute>,
            },
            {
                path: 'advertise-property',
                element: <AdminRoute><AdvertiseProperty /></AdminRoute>,
            },

            // Agent Routes
            {
                path: 'agent-profile',
                element: <AgentRoute><AgentProfile /></AgentRoute>,
            },
            {
                path: 'add-property',
                element: <AgentRoute><AddProperty /></AgentRoute>,
            },
            {
                path: 'my-added-property',
                element: <AgentRoute><MyAddedProperty /></AgentRoute>
            },
            {
                path: 'sold-properties',
                element: <AgentRoute><MySoldProperty /></AgentRoute>,
            },
            {
                path: 'requested-properties',
                element: <AgentRoute><RequestedProperty></RequestedProperty></AgentRoute>,
            },
            {
                path: 'my-added-property/property-update/:id',
                element:<AgentRoute><PropertyUpdate /></AgentRoute> ,
            },
        ]

    },


])