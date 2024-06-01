
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { TypeAnimation } from 'react-type-animation';

import { Autoplay } from 'swiper/modules';


const Banner = () => {
    return (
        <div>
            <div className='relative'>
                <div className='absolute inset-0 flex flex-col z-10 translate-x-4 md:translate-x-16 lg:translate-x-16 translate-y-6 md:translate-y-16 lg:translate-y-16 w-[70%] h-[70%]'>
                    <h1 className='font-bold text-2xl md:text-4xl lg:text-6xl text-white mb-2 md:mb-3 lg:mb-6' >Discover Your <br /> New <span className='text-[#4169E1]'>Home</span></h1>
                    <div >
                    <TypeAnimation className='text-white text-sm  md:text-xl lg:text-4xl font-semibold'  
                        sequence={['Single-Family Homes', 3000, 'Multi-Family Homes', 3000, 'Condominiums', 3000, 'Townhouses', 3000, 'Apartments', 3000,'Bungalows', 3000, ]}
                        repeat={Infinity}
                    />
                    </div>
                </div>

                <div>
                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >

                        <SwiperSlide><div className='bg-[url(/banner-1.jpg)] h-[140px] md:h-[300px] lg:h-[360px] w-full bg-cover bg-center bg-no-repeat'>
                            <div className='absolute inset-0 bg-gradient-to-b from-black  to-transparent opacity-70'></div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide><div className='bg-[url(/banner-2.jpg)] h-[140px] md:h-[300px] lg:h-[360px] w-full bg-cover bg-center bg-no-repeat'>
                            <div className='absolute inset-0 bg-gradient-to-b from-black  to-transparent opacity-70'></div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide><div className='bg-[url(/banner-3.jpg)] h-[140px] md:h-[300px] lg:h-[360px] w-full bg-cover bg-center bg-no-repeat'>
                            <div className='absolute inset-0 bg-gradient-to-b from-black  to-transparent opacity-70'></div>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide><div className='bg-[url(/banner-4.jpg)] h-[140px] md:h-[300px] lg:h-[360px] w-full bg-cover bg-center bg-no-repeat'>
                            <div className='absolute inset-0 bg-gradient-to-b from-black  to-transparent opacity-70'></div>
                        </div></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>


    );
};

export default Banner;