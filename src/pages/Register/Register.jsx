import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { createUser, updateUser, googleLogin, user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const image = form.image.files[0];

        setSuccess("");
        setErrorMessage("");

        if (password.length < 6) {
            setErrorMessage("Password Should be at least 6 Characters");
            toast.error("Password Should be at least 6 Characters");
            return;
        } else if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password))) {
            setErrorMessage("1 Uppercase, 1 Lowercase Letter, and 1 Special Character Required");
            toast.error("Uppercase, Lowercase Letter, and Special Character Required");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );

            const imageUrl = data.data.display_url;
            console.log(imageUrl);

            try {
                const userCredential = await createUser(email, password);
                await updateUser(name, imageUrl);

                setUser({ displayName: name, photoURL: imageUrl, email: email });
                const currentUser = {
                    email: email,
                    name: name,
                    role: 'user',
                    status: 'verified',
                }
                await axios.post(`${import.meta.env.VITE_DATABASE_URL}/user`, currentUser)

                toast.success('Registration Successful.');
                setSuccess("Successfully Registered");
                navigate(location?.state ? location.state : "/");
                console.log(userCredential.user);
            } catch (error) {
                setErrorMessage(error.message);
                toast.error(error.message);
            }
        } catch (error) {
            setErrorMessage("Image upload failed.");
            toast.error("Image upload failed.");
        }
    };

    // Social Login
    const handleSocialLogin = async (socialLoginProvider) => {
        try {
           const result =  await socialLoginProvider();
           console.log(result)
            if (!user) {
                const currentUser = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user',
                    status: 'verified',
                }
                await axios.post(`${import.meta.env.VITE_DATABASE_URL}/user`, currentUser)

                toast.success('Registration Successful');
                setSuccess("Successfully Registered");
                navigate(location?.state ? location.state : "/");
            } else {
                toast.error('Already User Created');
                setErrorMessage("Already User Created");
            }
        } catch (error) {
            setErrorMessage(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full min-h-[40vh] flex justify-center lg:mb-4">
            <div className="hero-content flex-col justify-center w-full">
                <div className="text-center">
                    <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">Register now!</h1>
                </div>
                <div className="card w-full lg:w-[40%] bg-white shadow-2xl">
                    <form className="card-body w-full pb-2" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-700 text-xs">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" name="name" className="input input-bordered bg-transparent border-gray-300 text-gray-700" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xs text-gray-700">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="text-gray-700 bg-transparent border-gray-300 input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xs text-gray-700">PhotoURL</span>
                            </label>
                            <input type="file" name="image" className="file-input file-input-bordered file-input-primary w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xs text-gray-700">Password</span>
                            </label>
                            <div className="relative w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="input input-bordered border-gray-300 w-full text-gray-700 bg-transparent" required />
                                <div onClick={handleShowPassword} className="absolute top-[39%] left-[85%] md:left-[88%] lg:left-[89%]">
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                            {errorMessage && <p className='text-red-500 text-sm mt-4'>Error: {errorMessage}</p>}
                            {success && <p className='text-blue-700 text-sm mt-4'>{success}</p>}
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn bg-[#4169E1] border-0 text-white">Register</button>
                        </div>
                        <div className="mt-2 text-center">
                            <p className="text-gray-700 text-sm">Already Have Account? <Link className="text-blue-600 font-semibold" to={"/login"}>Login</Link></p>
                        </div>
                    </form>
                    <div className="divider text-gray-700">Continue With</div>
                    <div className="flex justify-center items-center mb-6 pb-0">
                        <div onClick={() => handleSocialLogin(googleLogin)} className='flex cursor-pointer items-center justify-center text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 w-full m-6'>
                            <div className='px-4 py-2'>
                                <svg className='w-6 h-6' viewBox='0 0 40 40'>
                                    <path d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z' fill='#FFC107' />
                                    <path d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z' fill='#FF3D00' />
                                    <path d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z' fill='#4CAF50' />
                                    <path d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z' fill='#1976D2' />
                                </svg>
                            </div>

                            <span className='w-5/6 px-4 py-3 font-bold text-center'>
                                Sign in with Google
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
