import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyCard from "../../../components/Dashboard/Agent/PropertyCard";
import useAuth from "../../../hooks/useAuth";


const MyAddedProperty = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const { data: properties = [], isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties/${user?.email}`)
            return data
        },
    })
    // console.log(properties)

    return (
        <div>
            <h1 className="text-center font-bold xl:text-3xl">MY ADDED PROPERTIES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    properties.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                }
            </div>
        </div>
    );
};

export default MyAddedProperty;