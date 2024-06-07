import { useQuery } from "@tanstack/react-query";
import Banner from "../../components/Banner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyReviewCard from "../PropertyDetails/PropertyReviewCard";
import AdPropertyCard from "./AdPropertyCard";


const Home = () => {
    const axiosPublic = useAxiosPublic()
    // get all the properties
    const { data: allProperties = [], isLoading } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/advertisedProperties`)
            return data
        },
    })

    // get all the reviews
    const { data: reviews = [], isLoading: reviewLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/reviews`)
            return data
        },
    })

    console.log(allProperties)
    return (
        <div>
            <Banner></Banner>

            <h1 className="text-center font-bold xl:text-3xl mt-4">ADVERTISED PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3 font-sedan" >Handpicked Properties Offering Comfort, Luxury, and Unmatched Value for Your Dream Home </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    allProperties.slice(0,9).map(property => <AdPropertyCard key={property._id} property={property}></AdPropertyCard>).reverse()
                }
            </div>

            <div className="mt-6 text-center">
                <h1 className="text-center font-bold xl:text-3xl mt-4">REVIEWS</h1>
                <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3 font-sedan" >Discover What Our Satisfied Clients Are Saying About Their Wonderful Experiences with Our Properties</p>

                {reviews.length < 1 && <div className="mt-4">No One Reviewed Yet</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 mt-4 ">
                    {
                        reviews.slice(0,4).map(review => <PropertyReviewCard key={review._id} single_review={review}></PropertyReviewCard>).reverse()
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;