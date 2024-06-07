import { useState } from "react";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import AdminMenu from "./Admin/AdminMenu";
import AgentMenu from "./Agent/AgentMenu";
import UserMenu from "./User/UserMenu";




const Sidebar = () => {
    const [role,isLoading] = useRole()
    // console.log(role)
    const [isActive, setActive] = useState(false)

    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <div>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img src='../../../public/LOGO.png' width='80' height='80' />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto'>
                            <Link to='/'>
                                <img src='../../../public/LOGO.png' width='80' height='80' />
                            </Link>
                        </div>
                        <h1 className="text-center font-bold text-2xl hidden  md:flex justify-center">PROPEX</h1>
                    </div>

                    {/* Nav Links */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
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
                </div>
            </div>
        </div>
    );
};

export default Sidebar;