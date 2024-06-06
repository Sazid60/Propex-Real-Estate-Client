import { FaUserTie } from "react-icons/fa";
import MenuBar from "../MenuBar";
import { MdHomeWork, MdOutlineAddHomeWork } from "react-icons/md";
import { TbHomeDollar, TbHomeStats } from "react-icons/tb";


const AgentMenu = () => {
    return (
        <>
            <MenuBar icon={FaUserTie} label='Profile' address='agent-profile' />
            <MenuBar icon={MdOutlineAddHomeWork} label='Add Property' address='add-property' />
            <MenuBar icon={MdHomeWork} label='My Added Property' address='my-added-property' />
            <MenuBar icon={TbHomeDollar} label='Sold Properties' address='sold-properties' />
            <MenuBar icon={TbHomeStats} label='Requested Properties' address='requested-properties' />
        </>
    );
};

export default AgentMenu;