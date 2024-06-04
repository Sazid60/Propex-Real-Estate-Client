import { FaStar } from "react-icons/fa";


const AdminReviewCard = ({ single_review, handleDeleteReview }) => {
    const { _id, review, reviewerName, reviewerImage, reviewedPropertyId, reviewedPropertyName, reviewedTime, rating } = single_review

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        // <div className="max-w-md px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 border">
        //     <p className=" text-black dark:text-gray-300 mb-3 font-semibold text-lg xl:text-xl">Reviewed: <span className="text-blue-700">{reviewedPropertyName}</span></p>
        //     <div className="text-left h-14">
        //         <p className=" text-black dark:text-gray-300 ">{review}</p>
        //     </div>

        //     <div className="flex items-center justify-between mt-4">
        //         <p className="text-sm font-light text-gray-600 dark:text-gray-400">{formatDate(reviewedTime)}</p>
        //         <div className="flex items-center">
        //             <img className="hidden object-cover w-7 h-7 mx-4 rounded-full sm:block" src={reviewerImage} alt="avatar" />
        //             <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200 " role="link">{reviewerName}</p>
        //         </div>
        //     </div>
        //     <button
        //     onClick={()=>handleDeleteReview(_id)}
        //      className="btn w-full btn-sm bg-red-600 text-white mt-4">Delete This Review</button>
        // </div>
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                    <div>
                        <img src={reviewerImage} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-left">{reviewerName}</h4>
                        <span className="text-xs dark:text-gray-600">{formatDate(reviewedTime)}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2 dark:text-yellow-700">
                    <FaStar className="text-yellow-500"></FaStar>
                    <span className="text-xl font-bold">{rating}</span>
                </div>
            </div>
            <div className="p-4 space-y-2 text-sm dark:text-gray-600 text-center h-16">
                <p>
                    {review.split(' ').slice(0, 10).join(' ') + (review.split(' ').length > 10 ? '...' : '')}
                </p>
            </div>
            <button
                onClick={() => handleDeleteReview(_id)}
                className="btn w-full btn-sm bg-red-600 text-white mt-4">Delete This Review</button>
        </div>
    );
};

export default AdminReviewCard;