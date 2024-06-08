import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReqPropertyDataRow from "../../../components/Dashboard/Agent/ReqPropertyDataRow";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { Hourglass } from "react-loader-spinner";


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
        <div className='py-8'>
            <h1 className="text-center font-bold xl:text-3xl">REQUESTED PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >Keep track of properties have been requested or shown interest in, and stay informed on their status </p>
            <div className='overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 py-4'>
                <div className='inline-block min-w-full overflow-hidden'>
                    <table className='min-w-full table-auto'>
                        <thead>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    PROPERTY TITLE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    PROPERTY LOCATION
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    BUYER EMAIL
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    BUYER NAME
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    MY PRICE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    OFFERED PRICE
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
                                >
                                    ACCEPT
                                </th>
                                <th
                                    scope='col'
                                    className='px-5 py-3 border border-b-blue-700 text-left text-xs sm:text-sm font-semibold whitespace-nowrap text-blue-600'
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