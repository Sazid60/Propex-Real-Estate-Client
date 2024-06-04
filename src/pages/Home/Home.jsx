import { useQuery } from "@tanstack/react-query";
import AllPropertyCard from "../../components/AllPropertyCard";
import Banner from "../../components/Banner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Home = () => {
    const axiosPublic = useAxiosPublic()
    const { data: allProperties = [], isLoading } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/properties`)
            return data
        },
    })
    console.log(allProperties)
    return (
        <div>
            <Banner></Banner>

            <h1 className="text-center font-bold xl:text-3xl mt-4">ADVERTISED PROPERTIES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    allProperties.map(property => <AllPropertyCard key={property._id} property={property}></AllPropertyCard>)
                }
            </div>
        </div>
    );
};

export default Home;