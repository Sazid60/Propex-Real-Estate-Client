
const AdvertiseDataRow = ({ property, handleAdvertise }) => {
    const { _id, title, location, agentName, agentEmail,agentImage, maxPrice, minPrice, verification_status, propertyImage, advertised, selling_status, description} = property
    return (
        <tr>
            <td className='px-5 py-2 border-b text-sm whitespace-nowrap'>
                <img src={propertyImage} className="h-10 w-20" alt="" />
            </td>
            <td className='px-5 py-2 border-b text-sm whitespace-nowrap'>
                {title}
            </td>
            <td className='px-5 py-2  border-b  text-sm whitespace-nowrap'>
                {agentName}
            </td>
            <td className='px-5 py-2 border-b  text-sm whitespace-nowrap'>
                ${minPrice} - ${maxPrice}
            </td>
            <td className={`px-5 py-2 border-b  text-sm whitespace-nowrap uppercase ${verification_status === "rejected" ? 'text-red-600' : 'text-blue-700'}`}>
                {verification_status}
            </td>
            <td className='border-b text-sm whitespace-nowrap'>
                {selling_status === "sold" ? (
                    <span className='text-blue-600 font-bold'>SOLD</span>
                ) : advertised === "yes" ? (
                    <span className='text-green-500'>ADVERTISED</span>
                ) : (
                    verification_status !== "rejected" && (
                        <button
                            onClick={() => handleAdvertise(_id, property)}
                            className='btn btn-sm bg-blue-500 text-white rounded whitespace-nowrap'>
                            ADVERTISE
                        </button>
                    )
                )}
            </td>
        </tr>
    );
};

// : selling_status  === "sold" ? <span className='text-blue-700'>SOLD</span> :
export default AdvertiseDataRow;