import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import BoughtPropertyCard from "../../../components/Dashboard/User/BoughtPropertyCard";
import { Hourglass } from "react-loader-spinner";


const UserProperty = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: offeredProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['offeredProperties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offerings/${user?.email}`)
            return data
        },
    })
    // console.log(offeredProperties)
    // const handlePayment = async (id,propertyId) => {
    //     console.log(id,propertyId)
    // }
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
        <div>
            <h1 className="text-center font-bold xl:text-3xl">MY BOUGHT PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >A portfolio of acquired real estate assets reflecting astute investments and personalized living spaces.</p>
            {offeredProperties.length < 1 ? <p className="text-center mt-6">No Property have Been Bought Yet</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    offeredProperties.map(property => <BoughtPropertyCard key={property._id} property={property}></BoughtPropertyCard>).reverse()
                }
            </div>

            }
        </div>
    );
};

export default UserProperty;