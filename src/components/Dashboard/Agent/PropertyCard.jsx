import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PropertyCard = ({ property, handleDelete }) => {
    // eslint-disable-next-line react/prop-types
    const { _id, title, location, propertyImage, agentName, agentImage, agentEmail, maxPrice, minPrice, verification_status, description, selling_status } = property;

    return (
        <div className="bg-base-100 shadow-xl p-2 hover:shadow-2xl rounded-lg hover:-translate-y-2 duration-300 group">
            <figure className="w-full overflow-hidden">
                <div className="w-full h-32 md:h-40 lg:h-52 overflow-hidden rounded-t-lg">
                    <img className="object-cover h-full w-full rounded-t-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110" src={propertyImage} alt="" />
                </div>
                <h1 className={`w-full rounded-b-lg px-2 text-center uppercase text-white ${verification_status === 'pending' ? 'bg-slate-700' : verification_status === 'verified' ? 'bg-black' : 'bg-red-500'}`}>
                    {verification_status}
                </h1>
            </figure>
            <div className="p-2">
                <h2 className="font-bold text-sm md:text-sm xl:text-xl mb-2 uppercase text-center text-blue-600 font-amatic">{title}</h2>
                <p className="mb-4 text-xs md:text-sm lg:text-sm text-center md:h-20 lg:h-14 xl:h-10">
                    {description.split(' ').slice(0, 15).join(' ') + (description.split(' ').length > 15 ? '...' : '')}
                </p>
                <div>
                    <p className="font-bold text-xs md:text-xs lg:text-sm xl:text-sm mb-2 mt-3 text-center">
                        Price: <span className="text-blue-500">$ {minPrice} - $ {maxPrice}</span>
                    </p>
                    <p className="font-bold text-xs md:text-xs lg:text-sm xl:text-sm mb-2 mt-3 text-center whitespace-nowrap">
                        Location: <span className="font-normal">{location}</span>
                    </p>
                </div>
                <div>
                    <h1 className="text-center text-xs md:text-xs lg:text-sm font-semibold mb-2 mt-4 text-blue-800">ADDED BY</h1>
                    <hr className="mb-2 mt-1 border-t-1 border-gray-300" />
                    <div className="flex justify-center items-center">
                        {
                            selling_status === "sold" ? 
                            <p className="text-yellow-500 font-bold text-sm lg:text-lg xl:text-xl">SOLD</p> : 
                            <div className="flex gap-2">
                                {verification_status !== 'rejected' && (
                                    <Link to={`property-update/${_id}`}>
                                        <button className="btn btn-xs xl:btn-sm bg-[#4169E1] text-white font-semibold">
                                            Update
                                        </button>
                                    </Link>
                                )}
                                <button
                                    onClick={() => handleDelete(_id)}
                                    className="btn btn-xs xl:btn-sm bg-red-600 text-white font-semibold">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
