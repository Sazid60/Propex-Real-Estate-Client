import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropertyReviewCard from "./PropertyReviewCard";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";
import { FaStar } from "react-icons/fa";
// import PropertySpecificReview from "../../components/PropertySpecificReview";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import useRole from "../../hooks/useRole";



const PropertyDetails = () => {
    const axiosSecure = useAxiosSecure()
    const [role] = useRole()
    const navigate = useNavigate()
    const { id } = useParams()

    const { user } = useAuth()

    const { data: detailedProperty = {}, isLoading: propertyLoading } = useQuery({
        queryKey: ['detailedProperty'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/single-property/${id}`)
            return data
        },
    })

    // console.log(detailedProperty)

    const { _id: propertyId, propertyImage, title, location, maxPrice, minPrice, verification_status, agentImage, agentName, agentEmail, description } = detailedProperty

    // get property specific reviews
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews', propertyId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${propertyId}`)
            return data
        },
    })

    // console.log(reviews)

    // add a review
    const { mutateAsync } = useMutation({
        mutationFn: async reviewDetails => {
            const { data } = await axiosSecure.post(`/review`, reviewDetails)
            return data
        },
        onSuccess: () => {
            console.log('Review has been added successfully')
            toast.success('Review been added successfully')
            // reset the form
            document.getElementById("add-review").reset();
            refetch()
            document.getElementById('review_modal').close()
        },
    })

    const handleReview = async (event) => {
        event.preventDefault()
        const review = event.target.review.value;
        const rating = event.target.rating.value
        console.log(propertyId, review)

        const reviewDetails = {
            review,
            rating,
            reviewerName: user?.displayName,
            reviewerEmail: user?.email,
            reviewerImage: user?.photoURL,
            reviewedPropertyId: propertyId,
            reviewedPropertyName: title,
            reviewedTime: new Date().toISOString()
        }

        // console.log(reviewDetails)

        await mutateAsync(reviewDetails)
    }

    // handle add to wishlist
    const handleAddToWishlist = async () => {
        // console.log(propertyId)

        const wishlist_property = {
            propertyId,
            propertyImage,
            title,
            location,
            maxPrice,
            minPrice,
            verification_status,
            agentImage,
            agentName,
            agentEmail,
            description,
            wisherEmail: user?.email,
            wisherName: user?.displayName,
            wisherImage: user?.photoURL,
            offered_status: 'pending'
        }
        // console.log(wishlist_property)

        try {
            const { data } = await axiosSecure.post('/wishlist-property', wishlist_property)
            // console.log(data)

            if (data.insertedId) {
                toast.success('Property added to wishlist');
                navigate('/dashboard/wishlist');
            } else {
                toast.error(data.message);
            }
            // toast.success('Added To Wishlist')
            // navigate('/dashboard/wishlist')
            // console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    if (propertyLoading) {
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
        <>
            <h1 className="text-center font-bold xl:text-3xl ">PROPERTY DETAILS</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-6 font-sedan" >Discover the allure of our spaces through intricate property details.</p>

            <div className="flex flex-col">
                <div className='relative h-[150px] md:h-[300px] lg:h-[400px] xl:h-[600px] w-full'>
                    <div className='absolute inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center'>
                        <img src={propertyImage} alt="Banner Image" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="mt-3 ">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-sm md:text-lg lg:text-3xl font-bold text-blue-600 uppercase font-amatic" >{title}</h1>
                    </div>
                    <p className="mb-4 text-xs md:text-lg lg:text-lg" >{description}</p>

                    <div className="overflow-x-auto" >
                        <table className="table-auto w-full text-sm border border-solid ">
                            <tbody>
                                <tr >
                                    <td className="px-2 py-1 text-left font-semibold border border-solid text-xs md:text-sm lg:text-lg ">PRICE</td>
                                    <td className="px-2 py-1 border border-solid text-xs md:text-sm lg:text-lg text-blue-600">${minPrice} - ${maxPrice}</td>
                                </tr>
                                <tr >
                                    <td className="px-2 py-1 text-left font-semibold border text-xs md:text-sm lg:text-lg uppercase ">verification Status</td>
                                    <td className="px-2 py-1 border border-solid text-xs md:text-sm lg:text-lg uppercase text-blue-600 ">{verification_status}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 text-left font-semibold border text-xs md:text-sm lg:text-lg uppercase">Location</td>
                                    <td className="px-2 py-1 border border-solid text-xs md:text-sm lg:text-lg">{location}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 text-left font-semibold border text-xs md:text-sm lg:text-lg uppercase">Agent Name</td>
                                    <td className="px-2 py-1 border border-solid text-xs md:text-sm lg:text-lg">{agentName}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 text-left font-semibold border text-xs md:text-sm lg:text-lg uppercase">Agent Email</td>
                                    <td className="px-2 py-1 border border-solid text-xs md:text-sm lg:text-lg">{agentEmail}</td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="flex justify-center md:justify-end gap-3">
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button disabled={role === "admin" || role === "agent"} className="btn btn-sm bg-[#FFECB3] mt-4 mb-6 text-black text-xs md:text-sm lg:text-lg shadow-lg" onClick={() => document.getElementById('review_modal').showModal()}>ADD A REVIEW</button>
                            <dialog id="review_modal" className="modal modal-middle sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg text-center mb-4">WE LOVE TO TAKE REVIEWS FROM YOU!</h3>
                                    <form method="dialog"
                                        id="add-review"
                                        onSubmit={handleReview}
                                        className="space-y-4">
                                        <div>
                                            <textarea id="review" name="review" rows="4" className="mt-1 p-2  w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Write your review here..." required></textarea>
                                        </div>
                                        <div className="mt-4">
                                            <label className=" text-sm font-medium text-gray-700 text-center flex justify-center items-center gap-4">Rating <span className="flex"> <FaStar className="text-yellow-500"></FaStar> <FaStar className="text-yellow-500"></FaStar><FaStar className="text-yellow-500"></FaStar><FaStar className="text-yellow-500"></FaStar><FaStar className="text-yellow-500"></FaStar></span></label>
                                            <input type="number" id="rating" name="rating" min="0" max="5" step="0.5" className="mt-1 p-2  w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Rate from 0 to 5" required />
                                        </div>
                                        <div className="modal-action justify-between">
                                            <button type="submit" className="btn btn-sm bg-blue-700 text-white uppercase">Submit Review</button>
                                            <button type="button" className="btn btn-sm bg-red-600 text-white uppercase" onClick={() => document.getElementById('review_modal').close()}>Close</button>
                                        </div>
                                    </form>
                                </div>
                            </dialog>
                            <button
                                disabled={role === "admin" || role === "agent"}
                                onClick={() => handleAddToWishlist()}
                                className="btn btn-sm bg-blue-700 mt-4 mb-6 text-white  whitespace-nowrap text-xs md:text-sm lg:text-lg shadow-lg">ADD TO WISHLIST</button>
                        </div>
                        <div className="mt-6 text-center">
                            <h1 className="text-center font-bold xl:text-3xl">PROPERTY REVIEWS</h1>
                            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-6 font-sedan" >Delve into the insights and impressions shared by our valued visitors in our property reviews.</p>

                            {/* {reviews.length < 1 && <div className="mt-4">No One Reviewed Yet</div>}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 mt-4 ">
                                {
                                    reviews.map(review => <PropertyReviewCard key={review._id} single_review={review}></PropertyReviewCard>)
                                }
                            </div> */}
                            <div>
                                <>
                                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                        {reviews.length < 1 && <div className="mt-4">No One Reviewed Yet</div>}

                                        {
                                            reviews.map(review => <SwiperSlide key={review._id}><PropertyReviewCard single_review={review}></PropertyReviewCard></SwiperSlide>).reverse()
                                        }

                                    </Swiper>
                                </>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PropertyDetails;