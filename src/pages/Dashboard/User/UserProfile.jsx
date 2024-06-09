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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,288L0,256L36.9,256L36.9,192L73.8,192L73.8,0L110.8,0L110.8,256L147.7,256L147.7,160L184.6,160L184.6,32L221.5,32L221.5,160L258.5,160L258.5,192L295.4,192L295.4,32L332.3,32L332.3,288L369.2,288L369.2,192L406.2,192L406.2,32L443.1,32L443.1,128L480,128L480,320L516.9,320L516.9,256L553.8,256L553.8,96L590.8,96L590.8,288L627.7,288L627.7,64L664.6,64L664.6,32L701.5,32L701.5,0L738.5,0L738.5,96L775.4,96L775.4,64L812.3,64L812.3,0L849.2,0L849.2,64L886.2,64L886.2,96L923.1,96L923.1,288L960,288L960,32L996.9,32L996.9,160L1033.8,160L1033.8,160L1070.8,160L1070.8,32L1107.7,32L1107.7,224L1144.6,224L1144.6,224L1181.5,224L1181.5,128L1218.5,128L1218.5,160L1255.4,160L1255.4,192L1292.3,192L1292.3,192L1329.2,192L1329.2,256L1366.2,256L1366.2,288L1403.1,288L1403.1,224L1440,224L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"></path></svg>
        </div>
    );
};

export default UserProfile;