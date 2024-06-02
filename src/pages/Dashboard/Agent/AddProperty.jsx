import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddProperty = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async propertyInfo => {
          const { data } = await axiosSecure.post(`/property`, propertyInfo)
          return data
        },
        onSuccess: () => {
          console.log('Property Have been added successfully')
          toast.success('Property Have been added successfully')
        },
      })

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target
        const title = form.title.value;
        const location = form.location.value;
        const propImage = form.propImage.files[0];
        const agentName = form.agentName.value;
        const agentEmail = form.agentEmail.value;
        const minPrice = form.minPrice.value;
        const maxPrice = form.maxPrice.value;

        const formData = new FormData();
        formData.append('image', propImage);

        try {
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )
            const propertyImage = data.data.display_url;
            // console.log(propertyImage);
            try {
                // console.log(title, location, propertyImage, agentName, agentEmail, maxPrice, minPrice)
                const propertyInfo = {
                    title,
                    location,
                    propertyImage,
                    agentName,
                    agentEmail,
                    maxPrice,
                    minPrice,
                    verification_status: 'pending',
                    selling_status: 'unsold'
                }
                console.log(propertyInfo)

                await  mutateAsync (propertyInfo)

            } catch (error) {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">ADD YOUR PROPERTY</h2>
                <form onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Property Title</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1  w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className=" text-gray-700">Property Location</label>
                        <input
                            type="text"
                            id="location"
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Property Image</label>
                        <input
                            type="file"
                            id="propImage"
                            className="mt-1 p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Agent Name</label>
                        <input
                            type="text"
                            id="agentName"
                            value={user?.displayName}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className=" text-gray-700">Agent Email</label>
                        <input
                            type="email"
                            id="agentEmail"
                            value={user?.email}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className=" text-gray-700">Minimum Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Maximum Price</label>
                        <input
                            type="number"
                            id="maxPrice"
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-[#4169E1] hover:bg-slate-400 font-semibold rounded-md"
                        >
                            Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;