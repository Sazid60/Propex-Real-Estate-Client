import { useMutation, useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropertyCard from "../../../components/Dashboard/Agent/PropertyCard";
import useAuth from "../../../hooks/useAuth";
import { Hourglass } from "react-loader-spinner";
import toast from "react-hot-toast";



const MyAddedProperty = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: properties = [], isLoading, refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties/${user?.email}`)
            return data
        },
    })
    // console.log(properties)


    // delete a property
    const { mutateAsync } = useMutation({
        mutationFn: async id => {
          const { data } = await axiosSecure.delete(`/properties/${id}`)
          return data
        },
        onSuccess: data => {
          console.log(data)
          refetch()
          toast.success('Successfully Deleted Property')
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



    if (isLoading || loading) {
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
            <h1 className="text-center font-bold xl:text-3xl">MY ADDED PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3" >Easily access and manage a comprehensive list of properties you've personally added to our platform. </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    properties.map(property => <PropertyCard key={property._id} property={property} handleDelete={handleDelete}></PropertyCard>).reverse()
                }
            </div>
        </div>
    );
};

export default MyAddedProperty;