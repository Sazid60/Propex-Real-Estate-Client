import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyDataRow from "../../../components/Dashboard/Admin/PropertyDataRow";
import { Hourglass } from "react-loader-spinner";



const PropertyManage = () => {
    const axiosSecure = useAxiosSecure()

    const { data: properties = [], refetch, isLoading } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties`)
            return data
        },
    })
    
    console.log(properties)

    // handle verify status
    const handleVerify = async (id) => {
        try {
            await axiosSecure.patch(`/property/verify/${id}`, {verification_status:'verified'} );
            refetch()
        } catch (error) {
            console.error('Error verifying property:', error);
        }
    };

    // handle rejected status
    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/property/verify/${id}`, {verification_status:'rejected'});
            refetch()
        } catch (error) {
            console.error('Error rejecting property:', error);
        }
    };

    if (isLoading ) {
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
        <div className='py-8 '>

            <h1 className="text-center font-bold xl:text-3xl">MANAGE ALL PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >Efficiently oversee, maintain, and optimize all your real estate investments with comprehensive management services. </p>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden '>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    LOCATION
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    AGENT NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    AGENT EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    RANGE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                properties.map(property => <PropertyDataRow key={property._id} property={property} handleVerify={handleVerify} handleReject={handleReject} ></PropertyDataRow>).reverse()
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropertyManage;
