import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Hourglass } from "react-loader-spinner";
import AllPropertyCard from "../../components/AllPropertyCard";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";



const AllProperties = () => {
    const axiosSecure = useAxiosSecure()

    const { user, loading } = useAuth()

    const [search, setSearch] = useState('')
    const [searchClicked, setSearchClicked] = useState(false);

    const { data: allProperties = [], isLoading, isFetching } = useQuery({
        queryKey: ['allProperties', search],
        enabled: !!localStorage.getItem('access-token') && !loading,
        gcTime: 0,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties?search=${search}`)
            return data
        },

    })
    // console.log(allProperties)
    // console.log(isFetching)

    // useEffect(()=>{
    //     if(localStorage.getItem('access-token')){
    //         refetch()
    //     }
    // },[refetch])

    const handleSearch = (e) => {
        e.preventDefault()
        const text = e.target.text.value
        setSearch(text)
        setSearchClicked(true)
    }
    // console.log(search)

    const handleShowAll = () => {
        setSearch('');
        setSearchClicked(false);
    };

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
            <h1 className="text-center font-bold xl:text-3xl">ALL PROPERTIES</h1>
            <p className="text-center  text-xs md:text-lg lg:text-lg max-w-2xl mx-auto mt-2 mb-3 font-sedan" >Explore properties from cozy apartments to spacious villas, perfect for every lifestyle.</p>


            <form onSubmit={handleSearch} >
                <div className="flex justify-center items-center mt-6 ">
                    <label className="input input-bordered border-blue-600 flex md:w-[60%] items-center gap-2  shadow-xl">
                        <input type="text" id="text" name="text" className="grow" placeholder="Search" />
                        <button className="btn btn-sm bg-blue-600 text-white">Search</button>
                    </label>
                </div>
            </form>

            {searchClicked && ( 
                <div className="flex justify-center mt-3  items-center">
                    <button className="btn bg-blue-600 rounded-md btn-sm  text-white" onClick={handleShowAll}>SHOW ALL</button>
                </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mt-4 lg:mx-10 ">
                {
                    allProperties.map(property => <AllPropertyCard key={property._id} property={property}></AllPropertyCard>).reverse()
                }
            </div>
        </div>
    );
};

export default AllProperties;