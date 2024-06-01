import { FaOpencart, FaUserTie } from "react-icons/fa";
import MenuBar from "../MenuBar";
import { MdHomeWork, MdRateReview } from "react-icons/md";


const userMenu = () => {
    return (
        <>
            <MenuBar icon={FaUserTie} label='Profile' address='user-profile' />
            <MenuBar icon={FaOpencart} label='Wishlist' address='wishlist' />
            <MenuBar icon={MdHomeWork} label='Property Bought' address='property-bought' />
            <MenuBar icon={MdRateReview} label='My Reviews' address='user-reviews' />
        </>
    );
};

export default userMenu;