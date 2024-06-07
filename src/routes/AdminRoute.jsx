import { Hourglass } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {

    const [role, isLoading] = useRole()

    if (isLoading) return <div className="min-h-screen flex justify-center items-center">
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
    if (role === 'admin') return children
    return <Navigate to='/' />
};

export default AdminRoute;