import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Hourglass } from "react-loader-spinner";
import AllPropertyCard from "../../components/AllPropertyCard";


const AllProperties = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allProperties = [], isLoading } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties`)
            return data
        },
    })
    console.log(allProperties)

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
            <h1 className="text-center font-bold xl:text-3xl">ALL PROPERTIES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    allProperties.map(property => <AllPropertyCard key={property._id} property={property}></AllPropertyCard>)
                }
            </div>
        </div>
    );
};

export default AllProperties;