import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdvertiseDataRow from "../../../components/Dashboard/Admin/AdvertiseDataRow";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";


const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure()
    const { data: properties = [], refetch, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties`)
            return data
        },
    })

    // Handle Advertise
    // const handleAdvertise = async (id,verification_status) =>{
    //     console.log(id)
    //     if(verification_status !== "verified"){
    //         return toast.error('Please Verify First To Advertise This Property')
    //     }
    //     const {data } = await axiosSecure.patch(`/property/advertise/${id}`, {advertised : 'yes'})
    //     console.log(data)
    //     refetch()
    // }

    const handleAdvertise = async (id, property) => {
        const { _id: propertyId, title, location, agentName, agentEmail, maxPrice, minPrice, verification_status, propertyImage, description, agentImage, selling_status } = property

        const advertisement = {
            propertyId,
            title,
            location,
            agentName,
            agentEmail,
            maxPrice,
            minPrice,
            verification_status,
            propertyImage,
            description,
            advertised: "yes",
            advertising_status: "advertised",
            agentImage,
            selling_status

        }
        // console.log(id)
        if (verification_status !== "verified") {
            return toast.error('Please Verify First To Advertise This Property')
        }
        await axiosSecure.patch(`/property/advertise/${id}`, { advertised: 'yes' })
        await axiosSecure.post(`/propertyAdvertise`, advertisement)
        toast.success('Property Advertised Successfully')
        refetch()
    }

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
        <div className='py-8'>
            <h1 className="text-center font-bold xl:text-3xl">ADVERTISE PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >Promote your properties effectively with targeted advertising strategies. Reach potential buyers and renters through engaging and impactful campaigns </p>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 border border-b-blue-700 whitespace-nowrap '
                                >
                                    PROPERTY IMAGE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3  text-left text-xs sm:text-sm font-semibold text-blue-700 border border-b-blue-700 whitespace-nowrap '
                                >
                                    TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 text-blue-700 border border-b-blue-700  text-left text-xs sm:text-sm font-semibold whitespace-nowrap '
                                >
                                    AGENT NAME
                                </th>

                                <th
                                    scope='col'
                                    className='px-5 py-3 text-blue-700 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap '
                                >
                                    PRICE RANGE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 text-blue-700 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap '
                                >
                                    STATUS
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 text-blue-700 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap '
                                >
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                properties.map(property => <AdvertiseDataRow key={property._id} property={property} handleAdvertise={handleAdvertise}  ></AdvertiseDataRow>).reverse()
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseProperty;