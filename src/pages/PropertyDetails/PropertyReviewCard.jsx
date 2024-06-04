import { FaStar } from "react-icons/fa";

const PropertyReviewCard = ({ single_review }) => {
    const { review, reviewerName, reviewerImage, reviewedPropertyId, reviewedPropertyName, reviewedTime, rating } = single_review

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container shadow-lg flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
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
                    <FaStar className="text-yellow-400"></FaStar>
                    <span className="text-xl font-bold">{rating} </span>
                </div>
            </div>
            <div className="p-4 space-y-2 text-sm dark:text-gray-600 text-center">
                <p>
                    {review.split(' ').slice(0, 10).join(' ') + (review.split(' ').length > 10 ? '...' : '')}
                </p>
            </div>
        </div>
    );
};

export default PropertyReviewCard;