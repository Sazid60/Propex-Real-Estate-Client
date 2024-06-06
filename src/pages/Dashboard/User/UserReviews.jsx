import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import UserReviewCard from "../../../components/Dashboard/User/UserReviewCard";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const UserReviews = () => {
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
        // get all the reviews
        const { data: reviews = [], isLoading,refetch } = useQuery({
            queryKey: ['review'],
            queryFn: async () => {
                const { data } = await axiosSecure.get(`/userReview/${user?.email}`)
                return data
            },
        })
        console.log(reviews)
        // handle Delete Review
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
    return (
        <div>
            <h1 className="text-center font-bold xl:text-3xl mt-6 mb-4">YOUR ALL REVIEWS</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3 font-sedan" >Manage Your Added Reviews. You Can Delete Your Added Reviews </p>
            {reviews.length < 1 && <div className="mt-4 text-center">Not Reviewed Yet</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 ">
                {
                    reviews.map(review => <UserReviewCard key={review._id} single_review={review} handleDeleteReview={handleDeleteReview}></UserReviewCard>)
                }
            </div>
        </div>
    );
};

export default UserReviews;