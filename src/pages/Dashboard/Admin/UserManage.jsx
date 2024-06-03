import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserDataRow from "../../../components/Dashboard/Admin/UserDataRow";
import toast from "react-hot-toast";


const UserManage = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
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
    const handleMakeAdmin= async (id) => {
        console.log(id)
    }

    // handle make agent
    const handleMakeAgent= async (id) => {
        console.log(id)
    }

    // console.log(users)
    return (
        <div className='py-8'>
            <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6">MANAGE USERS</h1>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    USER NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    USER EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    USER ROLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    MAKE ADMIN
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    MAKE AGENT
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    MARK AS FRAUD
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
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
                                ></UserDataRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManage;