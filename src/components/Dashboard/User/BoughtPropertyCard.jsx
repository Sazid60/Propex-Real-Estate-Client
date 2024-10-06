import { Link } from "react-router-dom";

const BoughtPropertyCard = ({ property, handlePayment }) => {
    const { _id, title, propertyImage, location, agentName, agentImage, agentEmail, description, offerPrice, status, transactionId } = property;

    return (
        <div className="bg-base-100 shadow-md p-4 rounded-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 group">
            <figure className="w-full overflow-hidden rounded-t-lg">
                <div className="w-full h-32 md:h-40 lg:h-52 overflow-hidden">
                    {/* Image zoom effect on hover */}
                    <img className="object-cover h-full w-full rounded-t-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={propertyImage} alt="Property" />
                </div>
                <h1 className={`w-full px-2 py-1 text-center uppercase font-semibold text-xs md:text-md lg:text-sm xl:text-lg 
                ${status === 'pending' ? 'bg-orange-300 text-black' : status === 'accepted' ? 'bg-green-500 text-white' : status === 'bought' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}>
                    {status}
                </h1>
            </figure>
            <div className="p-4">
                <h2 className="font-bold text-sm md:text-base xl:text-lg mb-2 uppercase text-center text-blue-600 font-amatic">{title}</h2>
                <p className="mb-4 text-xs md:text-sm lg:text-base text-center md:h-16 lg:h-14 xl:h-12">
                    {description.split(' ').slice(0, 16).join(' ') + (description.split(' ').length > 16 ? '...' : '')}
                </p>
                <div className="text-center mb-4">
                    <p className="font-bold text-xs lg:text-sm xl:text-sm mb-2">Location: <span className="font-normal">{location}</span></p>
                    <hr />
                    <p className="font-bold text-xs md:text-md lg:text-lg mb-2">My Offer: <span className="text-blue-500">$ {offerPrice}</span></p>
                </div>
                <div className="mb-4">
                    <h1 className="text-center text-xs md:text-sm lg:text-base font-semibold mb-2 text-blue-800">ADDED BY</h1>
                    <hr className="mb-2 border-t-1 border-gray-300" />
                    <div className="flex flex-col justify-center items-center">
                        <div className="rounded-full overflow-hidden border-2 border-[#4169E1] h-10 w-10 flex items-center justify-center">
                            <img src={agentImage} className="h-full w-full object-cover" alt="Agent" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-xs md:text-base lg:text-base"><span className="font-semibold">Name:</span> {agentName}</h1>
                            <h1 className="text-xs md:text-base lg:text-base"><span className="font-semibold">Email:</span> {agentEmail}</h1>
                        </div>
                    </div>
                </div>
                <hr className="mb-3" />

                {/* Status-based conditional rendering */}
                {status === 'accepted' && (
                    <Link to={`paymentPage/${_id}`}>
                        <button className="btn btn-sm px-6 bg-green-500 text-white w-full font-semibold mt-2 uppercase transition-all duration-300 hover:bg-green-600">
                            Pay
                        </button>
                    </Link>
                )}
                {status === 'bought' && transactionId && (
                    <div className="text-center font-semibold text-black">
                        Transaction ID: <br />
                        <span className="text-blue-500 text-xs">{transactionId}</span>
                    </div>
                )}
                {status === 'pending' && (
                    <div className="text-center font-semibold text-orange-300 text-sm">
                        Wait For Acceptance...
                    </div>
                )}
                {status === 'rejected' && (
                    <div className="text-center font-semibold text-red-600">
                        Agent Rejected...
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoughtPropertyCard;
