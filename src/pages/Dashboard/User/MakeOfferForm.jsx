import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";


const MakeOfferForm = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [offerPrice, setOfferPrice] = useState('');

    const { data: wish = {}, isLoading, refetch } = useQuery({
        queryKey: ['wishes',],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishes/${id}`)
            return data
        },
    })

    const buyingDate = new Date();
    const formattedDate = buyingDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const handleOffer = async (e) => {
        e.preventDefault()
        const minPrice = parseFloat(wish.minPrice);
        const maxPrice = parseFloat(wish.maxPrice);
        const offer = parseFloat(offerPrice);

        if (offer < minPrice || offer > maxPrice) {
            toast.error(`Offer must be between $${minPrice} and $${maxPrice}`);
            return;
        }

        const offeredInfo = {
            propertyId: wish.propertyId,
            wishId: wish._id,
            title: wish.title,
            propertyImage: wish.propertyImage,
            location: wish.location,
            agentName: wish.agentName,
            agentEmail: wish.agentEmail,
            agentImage : wish.agentImage,
            description: wish.description,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerImage: user?.photoURL,
            offeredMinPrice: wish.minPrice,
            offeredMaxPrice: wish.maxPrice,
            offerPrice,
            status: 'pending'
        }
        console.log(offeredInfo)
        try {
            const { data } = await axiosSecure.post('/offerings', offeredInfo)
            console.log(data)
            toast.success('Your Offering Has Been Submitted')
            navigate('/dashboard/property-bought')
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(wish)
    if (isLoading) {
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
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-4 rounded shadow-md w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-3 text-center">MAKE AN OFFER</h2>
                <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-4 font-sedan" >Please enter your offer price within the specified range to proceed. Ensure all details are correct before submitting your offer.</p>
                <div className='relative h-[150px] md:h-[300px] lg:h-[300px] w-full mb-4'>
                    <div className='absolute inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center'>
                        <img src={wish.propertyImage} alt="Banner Image" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-white uppercase" >{wish.title || ''}</h1>
                    </div>
                </div>
                <form id="add-property-form"
                    onSubmit={handleOffer}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Property Title</label>
                        <input
                            type="text"
                            id="title"
                            defaultValue={wish.title || ''}
                            className="mt-1 w-full px-3 py-2 bg-gray-100  border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            readOnly

                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Property Location</label>
                        <input
                            type="text"
                            id="location"
                            defaultValue={wish.location || ''}
                            className="mt-1 w-full px-3 py-2 bg-gray-100  border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            readOnly

                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Agent Name</label>
                        <input
                            type="text"
                            id="agentName"
                            defaultValue={wish.agentName || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Agent Email</label>
                        <input
                            type="email"
                            id="agentEmail"
                            defaultValue={wish.agentEmail || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Price</label>
                        <input
                            type="text"
                            id="minPrice"
                            value={`$ ${wish.minPrice} - $ ${wish.maxPrice}` || ''}
                            className="mt-1 w-full px-3 py-2 bg-gray-100  border border-gray-300 rounded-md shadow-sm sm:text-sm"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Description</label>
                        <textarea id="description" name="description" rows="4"
                            defaultValue={wish.description || ''}
                            className="mt-1 p-2 block w-full rounded-md border bg-gray-100  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Write Description here..."></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Buyer Name</label>
                        <input
                            type="text"
                            id="buyerName"
                            defaultValue={user?.displayName || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Buyer Email</label>
                        <input
                            type="email"
                            id="buyerEmail"
                            defaultValue={user?.email || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-700">Buying Date</label>
                        <input
                            type="text"
                            id="buyingDate"
                            defaultValue={formattedDate || ''}
                            readOnly
                            className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className=" text-blue-700 font-bold uppercase">Offer A Price</label>
                        <input
                            type="number"
                            id="offerPrice"
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="mt-1 w-full px-3 py-2  border border-blue-700 rounded-md shadow-sm sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-white bg-[#4169E1] hover:bg-slate-400 font-semibold rounded-md"
                        >
                            OFFER
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MakeOfferForm;