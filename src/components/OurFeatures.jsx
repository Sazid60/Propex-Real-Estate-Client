import { FaListUl } from "react-icons/fa";
import { FaPersonCircleCheck, FaSackDollar } from "react-icons/fa6";
import { GiThreeFriends } from "react-icons/gi";


const OurFeatures = () => {
    return (
        <section className="lg:mb-10">
            <div className=" lg:px-6  ">
                <div className="flex flex-col  justify-center items-center xl:flex-row lg:gap-4">
                    <div className="w-full xl:w-1/2 flex justify-center items-center">
                    <img src="/client.jpg" className="mt-6 h-64 md:h-[450px] rounded-xl" alt="" />
                    </div>
                    <div className="w-full xl:w-1/2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-4 xl:mt-12 xl:gap-12">
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-white rounded-xl md:mx-4 bg-blue-500">
                                        <FaPersonCircleCheck />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize ">Personalized Service</h1>
                                        <p className="mt-3 text-gray-500  text-xs lg:text-lg">
                                            Tailored assistance to meet your unique needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-white rounded-xl md:mx-4 bg-blue-500">
                                        <FaListUl />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize ">Exclusive Listings</h1>
                                        <p className="mt-3 text-gray-500  text-xs lg:text-lg">
                                            Explore handpicked luxury properties in prime locations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-white rounded-xl md:mx-4 bg-blue-500">
                                        <FaSackDollar />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize ">Seamless Transactions</h1>
                                        <p className="mt-3 text-gray-500  text-xs lg:text-lg">
                                            Professional handling of every aspect of your transaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-white rounded-xl md:mx-4 bg-blue-500">
                                        <GiThreeFriends />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize ">Beautiful Neighborhoods</h1>
                                        <p className="mt-3 text-gray-500  text-xs lg:text-lg">
                                            Discover vibrant communities with diverse architectural styles.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default OurFeatures;