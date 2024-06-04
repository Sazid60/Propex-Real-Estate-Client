import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const PropertyUpdate = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate()

    const { data: property = {} } = useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-property/${id}`);
            return data;
        },
    });

    const [propertyData, setPropertyData] = useState(property);

    useEffect(() => {
        setPropertyData(property);
    }, [property]);

    const handleImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            const image_url = data.data.display_url;
            setPropertyData({ ...propertyData, propertyImage: image_url });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPropertyData = Object.assign({}, propertyData);
        delete updatedPropertyData._id;
        console.log(updatedPropertyData);
        try {
            const { data } = await axiosSecure.put(`/property/update/${property._id}`, updatedPropertyData)
            console.log(data)
            toast.success('Property updated')
            navigate('/dashboard/my-added-property')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-4 rounded shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">ADD YOUR PROPERTY</h2>
                <form id="add-property-form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Property Title</label>
                        <input
                            type="text"
                            id="title"
                            value={propertyData.title || ''}
                            onChange={e => setPropertyData({ ...propertyData, title: e.target.value })}
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Property Location</label>
                        <input
                            type="text"
                            id="location"
                            value={propertyData.location || ''}
                            onChange={e => setPropertyData({ ...propertyData, location: e.target.value })}
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Property Image</label>
                        <input
                            type="file"
                            id="propImage"
                            onChange={e => handleImage(e.target.files[0])}
                            className="mt-1 p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                            accept="image/*"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Agent Name</label>
                        <input
                            type="text"
                            id="agentName"
                            value={propertyData.agentName || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Agent Email</label>
                        <input
                            type="email"
                            id="agentEmail"
                            value={propertyData.agentEmail || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Minimum Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            value={propertyData.minPrice || ''}
                            onChange={e => setPropertyData({ ...propertyData, minPrice: e.target.value })}
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Maximum Price</label>
                        <input
                            type="number"
                            id="maxPrice"
                            value={propertyData.maxPrice || ''}
                            onChange={e => setPropertyData({ ...propertyData, maxPrice: e.target.value })}
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Description</label>
                        <textarea id="description" name="description" rows="4" 
                        value={propertyData.description || ''}
                        onChange={(e)=>setPropertyData({ ...propertyData, description: e.target.value })}
                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Write Description here..."></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-[#4169E1] hover:bg-slate-400 font-semibold rounded-md"
                        >
                            Update Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyUpdate;
