import { Link } from "react-router-dom";


const AdPropertyCard = ({property}) => {
    const { _id, title, location, propertyImage, agentName, agentImage, agentEmail, maxPrice, minPrice, verification_status, description,advertised } = property
    return (
        <>
            {
                verification_status === "verified" && advertised === "yes" && <div className="bg-base-100 shadow-md p-2 rounded-none hover:shadow-2xl">
                    <figure className="w-full">
                        <img className="object-cover h-32 md:h-40 lg:h-40 w-full" src={propertyImage} alt="" />
                        <h1 className={`w-full px-2 text-center uppercase text-white ${verification_status === 'pending' ? 'bg-slate-700' : verification_status === 'verified' ? 'bg-black' : 'bg-red-500'}`}>
                            {verification_status}
                        </h1>
                    </figure>
                    <div className="p-2">
                        <h2 className="font-bold text-sm md:text-sm lg:text-xl xl:text-2xl mb-2 uppercase text-center">{title}</h2>
                        <p className="mb-4 text-xs md:text-lg lg:text-lg text-center" >
                            {description.split(' ').slice(0, 20).join(' ') + (description.split(' ').length > 20 ? '...' : '')}
                        </p>
                        <div className="">
                            <p className="font-bold text-xs md:text-xs lg:text-lg xl:text-sm mb-2 mt-3 text-center">Price: <span className="text-blue-500">$ {minPrice} - $ {maxPrice}</span></p>
                            <p className="font-bold text-xs md:text-xs lg:text-lg xl:text-sm mb-2 mt-3 text-center">Location: <span className="font-normal">{location}</span></p>
                        </div>
                        <div className="">
                            <h1 className="text-center text-xs md:text-xs lg:text-sm font-semibold mb-2 mt-4 text-blue-800">ADDED BY</h1>
                            <hr className="mb-2 mt-1 border-t-1 border-gray-300" />
                            <div className="flex flex-col items-center xl:flex-row xl:justify-between">
                                <div className="flex flex-col xl:flex-row lg:gap-4 justify-center items-center mb-2 xl:mb-0">
                                    <div className="rounded-full overflow-hidden border-2 border-[#4169E1] h-10 w-10 flex items-center justify-center">
                                        <img src={agentImage} className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className="text-center xl:text-left">
                                        <h1 className="text-xs md:text-xs lg:text-base"><span className="font-semibold">Name:</span> {agentName}</h1>
                                        <h1 className="text-xs md:text-xs lg:text-base"><span className="font-semibold">Email:</span> {agentEmail}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full xl:w-auto">
                                    <Link to={`/property-details/${_id}`}>
                                        <button className="btn btn-sm bg-[#4169E1] text-white w-full mb-2 md:mb-0 font-semibold">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default AdPropertyCard;