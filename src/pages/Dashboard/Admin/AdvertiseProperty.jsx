import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AdvertiseDataRow from "../../../components/Dashboard/Admin/AdvertiseDataRow";
import toast from "react-hot-toast";


const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure()
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties`)
            return data
        },
    })

    // Handle Advertise
    const handleAdvertise = async (id,verification_status) =>{
        console.log(id)
        if(verification_status !== "verified"){
            return toast.error('Please Verify First To Advertise This Property')
        }
        const {data } = await axiosSecure.patch(`/property/advertise/${id}`, {advertised : 'yes'})
        console.log(data)
        refetch()
    }

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
                                    PROPERTY IMAGE
                                </th>
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
                                    AGENT NAME
                                </th>
        
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    PRICE RANGE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold'
                                >
                                    STATUS
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
                                properties.map(property => <AdvertiseDataRow key={property._id} property={property} handleAdvertise={handleAdvertise}  ></AdvertiseDataRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseProperty;