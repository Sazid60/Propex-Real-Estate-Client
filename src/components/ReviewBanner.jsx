import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import PropertyReviewCard from "../pages/PropertyDetails/PropertyReviewCard";
import { Hourglass } from "react-loader-spinner";

const ReviewBanner = () => {
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [], isLoading: reviewLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/reviews`)
            return data
        },
    })
    if (reviewLoading) return <div className="min-h-screen flex justify-center items-center">
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

export default ReviewBanner;