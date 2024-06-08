import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import PropertyReviewCard from "../pages/PropertyDetails/PropertyReviewCard";


const PropertySpecificReview = ({propertyId}) => {
    const axiosSecure = useAxiosSecure()
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews', propertyId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${propertyId}`)
            return data
        },
    })
    return (
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
    );
};

export default PropertySpecificReview;