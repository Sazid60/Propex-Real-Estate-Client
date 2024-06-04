
const AdvertiseDataRow = ({ property, handleAdvertise }) => {
    const { _id, title, location, agentName, agentEmail, maxPrice, minPrice, verification_status, propertyImage,advertised } = property
    return (
        <tr>
            <td className='px-5 py-2 border-b bg-white text-sm whitespace-nowrap'>
                <img src={propertyImage} className="h-10 w-20" alt="" />
            </td>
            <td className='px-5 py-2 border-b bg-white text-sm whitespace-nowrap'>
                {title}
            </td>
            <td className='px-5 py-2  border-b bg-white text-sm whitespace-nowrap'>
                {agentName}
            </td>
            <td className='px-5 py-2 border-b bg-white text-sm whitespace-nowrap'>
                ${minPrice} - ${maxPrice}
            </td>
            <td className='px-5 py-2 border-b bg-white text-sm whitespace-nowrap uppercase text-blue-700'>
                {verification_status}
            </td>
            <td className=' border-b bg-white text-sm whitespace-nowrap'>
                {advertised === "yes" ? (
                    <span className='text-green-500'>ADVERTISED</span>
                ) : (
                    <button 
                    onClick={()=>handleAdvertise(_id,verification_status)}
                    className='btn btn-sm bg-blue-500 text-white  rounded whitespace-nowrap'>
                        ADVERTISE
                    </button>
                )}
            </td>
        </tr>
    );
};

export default AdvertiseDataRow;