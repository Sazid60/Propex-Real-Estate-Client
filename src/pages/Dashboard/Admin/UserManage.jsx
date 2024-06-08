import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserDataRow from "../../../components/Dashboard/Admin/UserDataRow";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";


const UserManage = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`)
            return data
        },
    })

    // handle delete user
    const handleDeleteUser = async (id) => {
        console.log(id)
        await axiosSecure.delete(`/user/${id}`)
        refetch()
        toast.success('User Deleted Successfully')
    }

    // handle make admin
    const handleMakeAdmin = async (id, role) => {
        try {
            if (role === "admin") {
                return toast.error('User Is Already Admin')
            }
            await axiosSecure.patch(`/users/admin/${id}`, { role: 'admin' });
            refetch()
            toast.success('Role Updated to Admin')
        } catch (error) {
            console.error('Error verifying property:', error);
        }

    }

    // handle make agent
    const handleMakeAgent = async (id, role) => {
        // console.log(id)
        try {
            if (role === "agent") {
                return toast.error('User Is Already Agent')
            }
            await axiosSecure.patch(`/users/agent/${id}`, { role: 'agent' });
            refetch()
            toast.success('Role Updated to Agent')
        } catch (error) {
            console.error(error);
        }
    }

    // mark as fraud
    const handleMarkAsFraud = async (id, email) => {
        try {
            await axiosSecure.patch(`/users/fraud/${id}`, { status: 'fraud', email: email });
            refetch()
            toast.success('Agent Marked as Fraud')
        } catch (error) {
            console.error(error);
        }
    }
    if (isLoading ) {
        return <div className="min-h-screen flex justify-center items-center">
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
    }

    // console.log(users)
    return (
        <div className='py-8'>
            <h1 className="text-center font-bold xl:text-3xl">MANAGE USERS</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >Streamline user administration with effective management tools and personalized support. </p>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    USER NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    USER EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    USER ROLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    MAKE ADMIN
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    MAKE AGENT
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    MARK AS FRAUD
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    DELETE USER
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(single_user => <UserDataRow
                                    key={single_user._id}
                                    single_user={single_user}
                                    handleDeleteUser={handleDeleteUser}
                                    handleMakeAdmin={handleMakeAdmin}
                                    handleMakeAgent={handleMakeAgent}
                                    handleMarkAsFraud={handleMarkAsFraud}
                                ></UserDataRow>).reverse()
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManage;