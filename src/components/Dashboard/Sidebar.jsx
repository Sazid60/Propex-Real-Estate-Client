import { useState } from "react";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";
import AdminMenu from "./Admin/AdminMenu";
import AgentMenu from "./Agent/AgentMenu";
import UserMenu from "./User/UserMenu";
import { VscSignOut } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import { FaHome } from "react-icons/fa";




const Sidebar = () => {
    const [role, isLoading] = useRole()
    // console.log(role)
    const [isActive, setActive] = useState(false)

    const { signOutUser } = useAuth()

    const handleToggle = () => {
        setActive(!isActive)
    }


    return (
        <div className="">
            <div className='bg-base-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-2 font-bold ml-4'>
                        <Link to='/' className="flex flex-col justify-center items-center">
                            <img src='/LOGO.png' width='40' height='40' />
                            <h1 className="text-center font-bold text-lg">PROPEX</h1>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <RxHamburgerMenu className='h-5 w-5' />
                </button>
            </div>
            <div className={`z-10 border border-r  md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'}  md:translate-x-0  transition duration-200 ease-in-out`}>
                <div>
                    <div>
                        <div className='w-full flex px-4 py-2  rounded-lg justify-center items-center  mx-auto'>
                            <Link to='/'>
                                <img src='/LOGO.png' width='80' height='80' />
                                <h1 className="text-center font-bold text-xl md:text-2xl flex justify-center">PROPEX</h1>
                            </Link>
                        </div><hr />

                    </div>

                    <div className='flex flex-col justify-between flex-1 '>
                        <nav>
                            {
                                role === 'user' && <UserMenu></UserMenu>
                            }
                            {
                                role === 'agent' && <AgentMenu></AgentMenu>
                            }
                            {
                                role === 'admin' && <AdminMenu></AdminMenu>
                            }
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <Link to={"/"}>
                        <button
                            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
                            <FaHome className='w-4 h-4' />
                            <span className='mx-4 text-sm font-medium'>Go To Home Page</span>
                        </button>
                    </Link>
                    <button
                        onClick={signOutUser}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300  hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <VscSignOut className='w-4 h-4' />

                        <span className='mx-4 text-sm font-medium'>Logout</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;