import { Link } from "react-router-dom";

const WishPropertyCard = ({ wished_property, handleDelete }) => {
    const { _id, title, location, propertyImage, agentName, agentImage, agentEmail, maxPrice, minPrice, verification_status, description, propertyId } = wished_property;

    return (
        <div className="bg-base-100 shadow-md p-2 rounded-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 group">
            <figure className="w-full overflow-hidden rounded-t-lg">
                <div className="w-full h-32 md:h-40 lg:h-52 overflow-hidden">
                    {/* Apply a zoom effect on hover */}
                    <img className="object-cover h-full w-full rounded-t-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={propertyImage} alt="" />
                </div>
                <h1 className={`w-full px-2 py-1 text-center uppercase text-white rounded-b-lg ${verification_status === 'pending' ? 'bg-slate-700' : verification_status === 'verified' ? 'bg-black' : 'bg-red-500'}`}>
                    {verification_status}
                </h1>
            </figure>
            <div className="p-2">
                <h2 className="font-bold text-sm md:text-base xl:text-lg mb-2 uppercase text-center text-blue-600 font-amatic">{title}</h2>
                <p className="mb-4 text-xs md:text-sm lg:text-base text-center md:h-24 lg:h-14 xl:h-16">
                    {description.split(' ').slice(0, 20).join(' ') + (description.split(' ').length > 20 ? '...' : '')}
                </p>
                <div>
                    <p className="font-bold text-xs md:text-base lg:text-base mb-2 mt-3 text-center">Price: <span className="text-blue-500">$ {minPrice} - $ {maxPrice}</span></p>
                    <p className="font-bold text-xs md:text-base lg:text-base mb-2 mt-3 text-center whitespace-nowrap">Location: <span className="font-normal">{location}</span></p>
                </div>
                <div>
                    <h1 className="text-center text-xs md:text-sm lg:text-base font-semibold mb-2 mt-4 text-blue-800">ADDED BY</h1>
                    <hr className="mb-2 mt-1 border-t-1 border-gray-300" />
                    <div className="flex flex-col items-center xl:flex-row xl:justify-between">
                        <div className="flex flex-col xl:flex-row lg:gap-4 justify-center items-center mb-2 xl:mb-0">
                            <div className="rounded-full overflow-hidden border-2 border-[#4169E1] h-10 w-10 flex items-center justify-center">
                                <img src={agentImage} className="h-full w-full object-cover" alt="" />
                            </div>
                            <div className="text-center xl:text-left">
                                <h1 className="text-xs md:text-base lg:text-base"><span className="font-semibold">Name:</span> {agentName}</h1>
                                <h1 className="text-xs md:text-base lg:text-base"><span className="font-semibold">Email:</span> {agentEmail}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col w-full xl:w-auto">
                            <Link to={`offer/${_id}`}>
                                <button className="btn btn-sm bg-[#4169E1] text-white w-full mb-2 md:mb-0 font-semibold transition-all duration-300 hover:bg-blue-700">
                                    Make Offer
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn btn-sm bg-red-600 text-white w-full font-semibold transition-all duration-300 hover:bg-red-700">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishPropertyCard;
