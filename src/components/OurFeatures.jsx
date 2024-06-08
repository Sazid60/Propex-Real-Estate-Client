import { FaListUl } from "react-icons/fa";
import { FaPersonCircleCheck, FaSackDollar } from "react-icons/fa6";
import { GiThreeFriends } from "react-icons/gi";


const OurFeatures = () => {
    return (
        <section className="bg-white dark:bg-gray-900 lg:mb-10">
            <div className="container lg:px-6  mx-auto">
                <div className="flex flex-col  justify-center items-center xl:flex-row lg:gap-4">
                    <div className="w-full xl:w-1/2">
                        <iframe className="min-w-full mt-6 h-64 md:h-[450px] rounded-xl overflow-hidden" src="https://www.youtube.com/embed/LEqF_gXCygc?si=l2UvS4luMu6GPqHo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <div className="w-full xl:w-1/2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-4 xl:mt-12 xl:gap-12">
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white  dark:bg-blue-500">
                                        <FaPersonCircleCheck />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize dark:text-white">Personalized Service</h1>
                                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-xs lg:text-lg">
                                            Tailored assistance to meet your unique needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                                        <FaListUl />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize dark:text-white">Exclusive Listings</h1>
                                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-xs lg:text-lg">
                                            Explore handpicked luxury properties in prime locations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white  dark:bg-blue-500">
                                        <FaSackDollar />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize dark:text-white">Seamless Transactions</h1>
                                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-xs lg:text-lg">
                                            Professional handling of every aspect of your transaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700">
                                <div className="md:flex flex-col justify-center items-center md:-mx-4">
                                    <span className="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white  dark:bg-blue-500">
                                    <GiThreeFriends />
                                    </span>
                                    <div className="mt-2 lg:mt-4 md:mx-4 md:mt-0">
                                        <h1 className="text-sm lg:text-xl font-medium text-gray-700 capitalize dark:text-white">Beautiful Neighborhoods</h1>
                                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-xs lg:text-lg">
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