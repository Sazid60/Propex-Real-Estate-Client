import { FaStar } from "react-icons/fa";


const AdminReviewCard = ({ single_review, handleDeleteReview }) => {
    const { _id, review, reviewerName, reviewerImage, reviewedPropertyId, reviewedPropertyName, reviewedTime, rating } = single_review

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="container shadow-lg flex flex-col w-full max-w-lg p-3 xl:p-2 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex justify-between ">
            <div className="flex space-x-4">
                <div>
                    <img src={reviewerImage} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                </div>
                <div>
                    <h4 className="font-bold text-left text-xs md:text-xs xl:text-lg">{reviewerName}</h4>
                    <span className=" dark:text-gray-600 text-[8px] md:text-xs xl:text-sm">{formatDate(reviewedTime)}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2 dark:text-yellow-700">
                <FaStar className="text-yellow-400"></FaStar>
                <span className=" font-bold text-xs md:text-xs xl:text-lg">{rating} </span>
            </div>
        </div>
        <div className="p-3 space-y-2 text-sm dark:text-gray-600 text-center ">
            <p className="font-bold uppercase text-xs md:text-xs lg:text-xs xl:text-lg md:h-10">PROPERTY: <span className="text-blue-700">{reviewedPropertyName}</span></p>
            <p className="text-xs md:text-xs lg:text-lg xl:text-sm">
                {review.split(' ').slice(0, 10).join(' ') + (review.split(' ').length > 10 ? '...' : '')}
            </p>
        </div>
        <button
            onClick={() => handleDeleteReview(_id)}
            className="btn w-full btn-sm bg-red-600 text-white mt-2 lg:mt-4">Delete This Review</button>
    </div>

    );
};

export default AdminReviewCard;