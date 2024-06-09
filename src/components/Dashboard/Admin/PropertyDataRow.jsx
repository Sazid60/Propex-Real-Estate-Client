
// eslint-disable-next-line react/prop-types
const PropertyDataRow = ({property,handleVerify,handleReject}) => {
    // eslint-disable-next-line react/prop-types
    const { _id, title, location, agentName, agentEmail, maxPrice, minPrice, verification_status } = property
    return (
        <tr>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                {title}
            </td>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                {location}
            </td>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                {agentName}
            </td>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                {agentEmail}
            </td>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                ${minPrice} - ${maxPrice}
            </td>
            <td className='px-5 py-5 border-b  text-sm whitespace-nowrap'>
                {verification_status === 'verified' && <span className='text-green-500'>Verified</span>}
                {verification_status === 'rejected' && <span className='text-red-500'>Rejected</span>}
                {verification_status !== 'verified' && verification_status !== 'rejected' && (
                    <>
                        <button onClick={() => handleVerify(_id)} className='btn btn-xs text-green-500 hover:text-green-700 mr-2'>Verify</button>
                        <button onClick={() => handleReject(_id)} className='btn btn-xs text-red-500 hover:text-red-700'>Reject</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default PropertyDataRow;