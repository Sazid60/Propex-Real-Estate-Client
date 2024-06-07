import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Hourglass } from "react-loader-spinner";
import AllPropertyCard from "../../components/AllPropertyCard";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";


const AllProperties = () => {
    const axiosSecure = useAxiosSecure()

    const {user,loading} = useAuth()

    const { data: allProperties = [], isLoading, refetch, isFetching} = useQuery({
        queryKey: ['allProperties'],
        enabled : !!localStorage.getItem('access-token') && !loading,
        gcTime : 0, 
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties`)
            return data
        },
        
    })
    // console.log(allProperties)
    // console.log(isFetching)

    // useEffect(()=>{
    //     if(localStorage.getItem('access-token')){
    //         refetch()
    //     }
    // },[refetch])

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
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3 font-sedan" >Discover a Wide Range of Properties Tailored to Suit Every Lifestyle and Preference. From Cozy Apartments to Spacious Villas, We Have the Perfect Home for You.e </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    allProperties.map(property => <AllPropertyCard key={property._id} property={property}></AllPropertyCard>)
                }
            </div>
        </div>
    );
};

export default AllProperties;