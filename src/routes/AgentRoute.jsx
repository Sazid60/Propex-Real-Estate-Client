import { Hourglass } from "react-loader-spinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";


const AgentRoute = ({ children }) => {
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
    if (role === 'agent') return children
    return <Navigate to='/dashboard' />
};

export default AgentRoute;