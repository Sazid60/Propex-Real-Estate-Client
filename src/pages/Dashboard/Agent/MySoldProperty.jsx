import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign } from "react-icons/fa";
import { TbHomeHand } from "react-icons/tb";
import { Hourglass } from "react-loader-spinner";


const MySoldProperty = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // console.log(user?.email)
    const { data: soldProperties = [], isLoading, refetch } = useQuery({
        queryKey: ['sold', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-sold-properties?agentEmail=${user?.email}`)
            return data
        },
    })
    // console.log(soldProperties)
    const { data: agentStat = {}, isLoading: statLoading } = useQuery({
        queryKey: ['agentStat'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/agent-statistics?agentEmail=${user?.email}`)
            return data
        },
    })

    const {soldProperties : totalSoldProperties,totalPrice,totalProperties} = agentStat

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
            <div className="flex justify-center items-center w-full">
                <div className="stats shadow w-[80%] mb-6 border border-b-blue-400 border-b-4 ">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaDollarSign className="text-5xl text-yellow-500" />
                        </div>
                        <div className="stat-title">Total Sold Amount</div>
                        <div className="stat-value text-primary">{totalPrice} $</div>
                    </div>

                    <div className="stat ">
                        <div className="stat-figure text-secondary">
                            <TbHomeHand className="text-5xl text-yellow-500" />
                        </div>
                        <div className="stat-title">Total Sold Properties</div>
                        <div className="stat-value text-green-500">{totalSoldProperties} Out Of {totalProperties}</div>

                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value mb-2">{user?.displayName}</div>
                        <div className="stat-title">Email: {user?.email}</div>
                        {/* <div className="stat-title font-bold mt-2"><span className="text-black font-semibold">PROPERTIES:</span> {totalProperties}</div> */}
                    </div>

                </div>
            </div>
            <h1 className="text-center font-bold xl:text-3xl">MY SOLD PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >View a comprehensive list of properties you've successfully sold </p>
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
                                    SOLD PRICE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                soldProperties.map(property => (
                                    <tr key={property._id}>
                                        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>{property.title}</td>
                                        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>{property.location}</td>
                                        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>{property.buyerEmail}</td>
                                        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap'>{property.buyerName}</td>
                                        <td className='px-5 py-3 border-b text-xs sm:text-sm whitespace-nowrap text-blue-600'>{property.offerPrice} $</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default MySoldProperty;