import { Link } from "react-router-dom";


const BoughtPropertyCard = ({ property, handlePayment }) => {
    const { _id, propertyId, wishId, title, propertyImage, location, agentName, agentImage, agentEmail, description, buyerName, buyerEmail, buyerImage, offeredMinPrice, offeredMaxPrice, offerPrice, status,transactionId } = property
    return (
        <div className="bg-base-100 shadow-md p-4 rounded-lg hover:shadow-2xl ">
            <figure className="w-full">
                <img className="object-cover h-32 md:h-40 lg:h-40 w-full" src={propertyImage} alt="Property" />
                <h1 className={`w-full px-2 text-center uppercase font-semibold text-xs md:text-md lg:text-sm xl:text-lg  ${status === 'pending' ? 'bg-orange-300 text-black' : status === 'accepted' ? 'bg-green-500 text-white' : status === 'bought' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                    {status}
                </h1>
            </figure>
            <div className="p-4">
                <h2 className="font-bold text-sm md:text-sm xl:text-xl mb-2 uppercase text-center">{title}</h2>
                <p className="mb-4 text-xs md:text-sm lg:text-sm text-center">
                    {description.split(' ').slice(0, 16).join(' ') + (description.split(' ').length > 16 ? '...' : '')}
                </p>
                <div className="text-center mb-4">
                    <p className="font-bold text-xs  lg:text-sm xl:text-sm mb-2">Location: <span className="font-normal">{location}</span></p><hr />
                    <p className="font-bold text-xs md:text-md lg:text-lg mb-2">My Offer: <span className="text-blue-500">$ {offerPrice}</span></p>
                </div>
                <div className="mb-4">
                    <h1 className="text-center text-xs md:text-sm lg:text-sm font-semibold mb-2 text-blue-800">ADDED BY</h1>
                    <hr className="mb-2 border-t-1 border-gray-300" />
                    <div className="">
                        <div className="flex flex-col justify-center items-center mb-2 xl:mb-0">
                            <div className="rounded-full overflow-hidden border-2 border-[#4169E1] h-10 w-10 flex items-center justify-center">
                                <img src={agentImage} className="h-full w-full object-cover" alt="Agent" />
                            </div>
                            <div className="text-center ">
                                <h1 className="text-xs md:text-md lg:text-lg"><span className="font-semibold ">Name:</span> {agentName}</h1>
                                <h1 className="text-xs md:text-md lg:text-lg"><span className="font-semibold">Email:</span> {agentEmail}</h1>
                            </div>
                        </div>
                    </div>
                </div> <hr className="mb-3" />
                {status === 'accepted' && (
                    <Link to={`paymentPage/${_id}`}>
                        <button
                            className="btn btn-sm px-6 bg-green-500 text-white w-full font-semibold mt-2 uppercase">
                            Pay
                        </button>
                    </Link>
                )}
                {status === 'bought' && transactionId && (
                    <div className="text-center font-semibold text-black whitespace-nowrap">
                        Transaction ID: <br />
                         <span className="text-blue-500 text-xs">{transactionId}</span>
                    </div>
                )}
                {status === 'pending' && (
                    <div className="text-center font-semibold text-orange-300 text-sm">
                        Wait For Acceptance....
                    </div>
                )}
                {status === 'rejected' && (
                    <div className="text-center font-semibold text-red-600">
                        Agent Rejected....
                    </div>
                )}

            </div>
        </div>
    );
};

export default BoughtPropertyCard;