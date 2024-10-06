import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const UserProfile = () => {
    const { user } = useAuth()
    const [role] = useRole()
    return (
        <div className="flex flex-col justify-between items-center h-screen">
            <div className="bg-base-100  rounded-lg w-full max-w-md p-6">
                <div className="text-center">
                    <img
                        alt="profile"
                        src={user?.photoURL}
                        className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-gray-200"
                    />
                    <h2 className="text-xl lg:ext-2xl font-semibold text-gray-800 mb-2">
                        Welcome, <span className="text-blue-600">{user?.displayName}</span>!
                    </h2>
                    <p className="text-sm text-gray-600 mb-4"><span className="font-semibold">Role:</span> <span className="uppercase text-blue-600 font-semibold">{role}</span></p>
                    <div className="mb-4">
                        <p className="text-sm text-gray-700"> <span className="font-semibold">User ID: </span>{user?.uid}</p>
                        <p className="text-sm text-gray-700 mt-4"><span className="font-semibold">Email: </span> <span className="text-blue-600">{user?.email}</span></p>
                    </div>

                </div>
            </div>
            <img className='absolute bottom-0 w-full' src="/wave.svg" alt='' />
        </div>
    );
};

export default UserProfile;