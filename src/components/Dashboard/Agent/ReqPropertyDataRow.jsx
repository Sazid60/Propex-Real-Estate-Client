

const ReqPropertyDataRow = ({ offer, handleReject,handleAccept }) => {
    return (
        <tr>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                {offer?.title}
            </td>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                {offer?.location}
            </td>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                {offer?.buyerEmail}
            </td>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                {offer?.buyerName}
            </td>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                $ {offer?.offeredMinPrice} - $ {offer?.offeredMaxPrice}
            </td>

            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap text-blue-600'>
                {offer?.offerPrice} $
            </td>

            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>
                {offer?.status === "rejected" && ""}

                {offer?.status === "pending" && <button
                    className='bg-green-500 text-white px-3 py-1 rounded'
                onClick={() => handleAccept(offer?._id, offer?.propertyId)}
                >
                    Accept
                </button>}

                {offer?.status === "accepted" && <span className='text-green-600'>Accepted</span>}


            </td>
            <td className='px-5 py-3 border-b text-left text-xs sm:text-sm whitespace-nowrap'>

                {offer?.status === "rejected" && <span className='text-red-600'>Rejected</span>}

                {offer?.status === "pending" && <button
                    className='bg-red-500 text-white px-3 py-1 rounded'
                    onClick={() => handleReject(offer._id)}
                >
                    Reject
                </button>}

                {offer?.status === "accepted" && ""}

            </td>
        </tr>
    );
};

export default ReqPropertyDataRow;