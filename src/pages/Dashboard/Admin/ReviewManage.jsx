import { useQuery } from "@tanstack/react-query";
import AdminReviewCard from "../../../components/Dashboard/Admin/AdminReviewCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Hourglass } from "react-loader-spinner";
import toast from "react-hot-toast";

const ReviewManage = () => {
    const axiosSecure = useAxiosSecure()
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews`)
            return data
        },
    })
    console.log(reviews)

    // handel delete Review

    const handleDeleteReview = async (id) => {
        // console.log(id)
        try {
           const {data} = await axiosSecure.delete(`review/${id}`)
            refetch()
            toast.success('Review Deleted Successfully')
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    }
    return (
        <div>
            <h1 className="text-center font-bold xl:text-3xl mt-6 mb-4">ALL PROPERTY REVIEWS</h1>
            {reviews.length < 1 && <div className="mt-4 text-center">No One Reviewed Yet</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:px-10">
                {
                    reviews.map(review => <AdminReviewCard key={review._id} single_review={review} handleDeleteReview={handleDeleteReview}></AdminReviewCard>)
                }
            </div>
        </div>
    );
};

export default ReviewManage;