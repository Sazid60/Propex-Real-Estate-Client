import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Import fade effect styles

// Import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyReviewCard from "../pages/PropertyDetails/PropertyReviewCard";
import { Hourglass } from "react-loader-spinner";

const ReviewBanner = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isLoading: reviewLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/reviews`);
            return data;
        },
    });

    if (reviewLoading) return (
        <div className="min-h-screen flex justify-center items-center">
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
    );

    return (
        <div className=''>
            <Swiper
                spaceBetween={60} // Space between slides
                effect={'fade'} // Set fade effect
                navigation={true} // Enable navigation buttons
                modules={[EffectFade, Navigation, Autoplay]} // Include necessary modules
                className="mySwiper"
                loop={true} // Enable loop
                autoplay={{
                    delay: 2500, // Adjust delay as needed
                }}
                slidesPerView={1} // Show 1 slide at a time
            >
                {reviews.length < 1 && <SwiperSlide className="mt-4 text-center">No One Reviewed Yet</SwiperSlide>}

                {reviews.map(review => (
                    <SwiperSlide key={review._id} className="flex justify-center items-center bg-slate-50 rounded-lg">
                        <PropertyReviewCard single_review={review} />
                    </SwiperSlide>
                )).reverse()}
            </Swiper>
        </div>
    );
};

export default ReviewBanner;
