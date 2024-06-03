import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyDataRow from "../../../components/Dashboard/Admin/PropertyDataRow";



const PropertyManage = () => {
    const axiosSecure = useAxiosSecure()

    const { data: properties = [], refetch } = useQuery({
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


    return (
        <div className='py-8'>
            <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6">MANAGE ALL PROPERTIES</h1>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    LOCATION
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    AGENT NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    AGENT EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    RANGE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                properties.map(property => <PropertyDataRow key={property._id} property={property} handleVerify={handleVerify} handleReject={handleReject} ></PropertyDataRow>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropertyManage;
