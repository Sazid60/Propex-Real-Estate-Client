import { Hourglass } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()
    // console.log({ user, loading })

    if (loading) return <div className="min-h-screen flex justify-center items-center">
        <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
        />
    </div>
    if (user?.email) return children
    return <Navigate to='/login' state={location?.pathname} replace='true' />

};

export default PrivateRoute;