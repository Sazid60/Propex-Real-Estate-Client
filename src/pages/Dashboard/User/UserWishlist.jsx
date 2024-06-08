import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import WishPropertyCard from "../../../components/Dashboard/User/WishPropertyCard";
import { Hourglass } from "react-loader-spinner";
import toast from "react-hot-toast";


const UserWishlist = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // get user specific Wishlist
    const { data: wishes = [], isLoading, refetch } = useQuery({
        queryKey: ['wishes', user],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishes?email=${user.email}`)
            return data
        },
    })
    // console.log(wishes)

    // delete a property from wishlist
    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/wishes/${id}`)
            return data
        },
        onSuccess: data => {
            console.log(data)
            refetch()
            toast.success('Successfully Deleted From Wishlist')
        },
    })

    //   deleting function
    const handleDelete = async id => {
        console.log(id)
        try {
            await mutateAsync(id)
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
            <h1 className="text-center font-bold xl:text-3xl">MY WISHED PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >An anthology of dream homes embodying the perfect fusion of luxury, comfort, and innovation. </p>
            {wishes.length < 1 ? <p className="text-center mt-6">No Property is Added In Wishlist</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    wishes.map(wish => <WishPropertyCard key={wish._id} wished_property={wish} handleDelete={handleDelete} ></WishPropertyCard>).reverse()
                }
            </div>

            }
        </div>
    );
};

export default UserWishlist;