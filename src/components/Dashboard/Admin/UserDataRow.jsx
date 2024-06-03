import useAuth from "../../../hooks/useAuth";

const UserDataRow = ({single_user,handleDeleteUser,handleMakeAdmin,handleMakeAgent,handleMarkAsFraud}) => {
    const {_id,email,role,status,name} = single_user

    const {user} = useAuth()
    
    return (
        <tr>
        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>
            {name}
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>
            {email}
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap uppercase text-blue-700 font-bold'>
            {role}
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>
            {
                status !== "fraud" &&
                <button
                disabled={ user?.email===email}
                    onClick={() => handleMakeAdmin(_id,role)}
                    className='btn btn-sm bg-blue-500 text-white px-2 py-1 rounded whitespace-nowrap'
                >
                    Make Admin
                </button>
            }
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm'>
            {
                status !== "fraud" && 
                <button
                    onClick={() => handleMakeAgent(_id,role)}
                    disabled={ user?.email===email}
                    className='btn btn-sm bg-green-500 text-white px-2 py-1 rounded whitespace-nowrap'
                >
                    Make Agent
                </button>
            }
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm'>
            {
                role === "agent" && status !=="fraud" &&
                <button
                    onClick={() => handleMarkAsFraud(_id, email)}
                    className=' btn btn-sm bg-yellow-500 text-white px-2 py-1 rounded whitespace-nowrap'
                >
                    Mark as Fraud
                </button>
            }
            {
                status === 'fraud' &&
                <span className='text-red-600 font-bold whitespace-nowrap'>FRAUD</span>
            }
        </td>
        <td className='px-5 py-3 border-b text-xs sm:text-sm'>
            <button
            disabled={user?.email===email}
                onClick={() => handleDeleteUser(_id)}
                className='btn btn-sm bg-red-500 text-white px-2 py-1 rounded whitespace-nowrap'
            >
                Delete User
            </button>
        </td>
    </tr>
    );
};

export default UserDataRow;