import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReqPropertyDataRow from "../../../components/Dashboard/Agent/ReqPropertyDataRow";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";


const RequestedProperty = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    console.log(user?.email)
    const { data: offerings = [], isLoading, refetch } = useQuery({
        queryKey: ['offerings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/getOfferings?agentEmail=${user?.email}`)
            return data
        },
    })
    console.log(offerings)

    // Reject an Offer
    const handleReject = async (id) => {
        const {data} = await axiosSecure.patch(`/rejectOffering/${id}`, {status: "rejected"})

        toast.success('User Offer Have Been Rejected')
        refetch()
    }

    // handle accept
    const handleAccept = async (id, propertyId) => {
        try {
            const { data } = await axiosSecure.patch(`/acceptOffering`, {
                status: "accepted",
                propertyId: propertyId,
                id: id,
            });
    
            toast.success('User Offer Has Been Accepted');
            refetch();
        } catch (error) {
            console.error("Error accepting offer:", error);
            toast.error('Failed to accept the offer. Please try again.');
        }
    };

    return (
        <div className='py-8'>
            <h1 className="text-center font-bold text-2xl sm:text-3xl mb-6">MANAGE ALL OFFERS</h1>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    PROPERTY TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    PROPERTY LOCATION
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    BUYER EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    BUYER NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    MY PRICE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    OFFERED PRICE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    ACCEPT
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border-b text-left text-xs sm:text-sm font-semibold whitespace-nowrap'
                                >
                                    REJECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offerings.map(offer => <ReqPropertyDataRow key={offer._id} offer={offer} handleReject={handleReject} handleAccept ={handleAccept}></ReqPropertyDataRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default RequestedProperty;