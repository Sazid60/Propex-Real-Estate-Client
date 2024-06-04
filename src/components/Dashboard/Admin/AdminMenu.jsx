import { FaUserTie, FaUsers } from "react-icons/fa";
import MenuBar from "../MenuBar";
import { BsBuildingsFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";


const AdminMenu = () => {
    return (
        <>
            <MenuBar icon={FaUserTie} label='Profile' address='admin-profile' />
            <MenuBar icon={BsBuildingsFill} label='Manage Properties' address='manage-properties' />
            <MenuBar icon={FaUsers} label='Manage Users' address='manage-users' />
            <MenuBar icon={RiAdvertisementLine} label='Advertise Properties' address='advertise-property' />
            <MenuBar icon={MdRateReview} label='Manage Reviews' address='manage-reviews' />
        </>
    );
};

export default AdminMenu;