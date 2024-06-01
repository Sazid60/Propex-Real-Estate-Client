import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex lg:flex">
            <Sidebar></Sidebar>
            <div className="flex-1 md:ml-60">
                <div className="p-5">
                    <Outlet></Outlet>
                </div>
            </div>


        </div>
    );
};

export default DashboardLayout;