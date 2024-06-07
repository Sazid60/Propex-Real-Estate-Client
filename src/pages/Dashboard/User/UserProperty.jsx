import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import BoughtPropertyCard from "../../../components/Dashboard/User/BoughtPropertyCard";


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
    return (
        <div>
            <h1 className="text-center font-bold xl:text-3xl">MY BOUGHT PROPERTIES</h1>
            {offeredProperties.length < 1 ? <p className="text-center mt-6">No Property have Been Bought Yet</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    offeredProperties.map(property => <BoughtPropertyCard key={property._id} property={property}></BoughtPropertyCard>)
                }
            </div>

            }
        </div>
    );
};

export default UserProperty;