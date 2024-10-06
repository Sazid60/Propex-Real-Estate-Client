import { FaStar } from "react-icons/fa";

const PropertyReviewCard = ({ single_review }) => {
    const { review, reviewerName, reviewerImage, reviewedPropertyId, reviewedPropertyName, reviewedTime, rating } = single_review

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container  flex flex-col w-full max-w-6xl p-3 xl:p-3 mx-auto divide-y  dark:divide-gray-300 rounded-lg ">
            <div className="flex justify-center ">

                <div className="flex flex-row gap-2 mb-1 items-center  dark:text-yellow-700">
                    <FaStar className="text-yellow-400"></FaStar>
                    <span className=" font-bold text-xs md:text-lg lg:text-lg">{rating} </span>
                </div>
            </div>
            <div className="p-4 space-y-2 text-sm  text-center">
                <p className="font-bold text-xs md:text-sm lg:text-xl xl:text-2xl mb-2 uppercase text-center font-amatic">PROPERTY: <span className="text-blue-700">{reviewedPropertyName}</span></p>
                <p className="text-xs md:text-xs lg:text-lg xl:text-sm">
                    {review.split(' ').slice(0, 20).join(' ') + (review.split(' ').length > 20 ? '...' : '')}
                </p> <hr />
                <div className="flex flex-col justify-center items-center ">
                    <div>
                        <img src={reviewerImage} alt="" className="object-cover w-12 h-12 rounded-full " />
                    </div>
                    <div>
                        <h4 className="font-bold text-xs md:text-lg lg:text-lg">{reviewerName}</h4>
                        <span className="  text-[8px] md:text-sm lg:text-sm">{formatDate(reviewedTime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyReviewCard;