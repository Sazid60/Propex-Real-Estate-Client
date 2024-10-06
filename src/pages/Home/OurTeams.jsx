import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const OurTeams = () => {
    return (
        <section className="bg-white">
            <div className="px-6 py-5 lg:py-10">
                <div className="xl:flex xl:items-center xl:-mx-4">
                    <div className="xl:w-1/2 xl:mx-4">
                        <h1 className="text-center font-bold xl:text-3xl mt-4 uppercase">Meet Our Leadership</h1>
                        <div className="flex justify-center items-center">
                            <p className="max-w-2xl mt-4 text-gray-500">
                                Meet our dedicated team driving our success, each contributing unique skills to our mission.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
                        {/* Team member 1 */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    className="object-cover rounded-xl aspect-square h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-60 lg:w-60 transition duration-300 ease-in-out group-hover:blur-sm"
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    alt="Shahnawaz Sazid"
                                />
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-50 rounded-xl">
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-white text-xl">
                                            <FaFacebook />
                                        </a>
                                        <a href="#" className="text-white text-xl">
                                            <FaTwitter />
                                        </a>
                                        <a href="#" className="text-white text-xl">
                                            <FaLinkedin />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Text elements (outside the blur effect) */}
                            <h1 className="mt-4 text-sm md:text-sm lg:text-xl xl:text-xl font-semibold text-gray-700 uppercase">
                                Shahnawaz Sazid
                            </h1>
                            <p className="mt-2 text-gray-500 text-sm md:text-sm lg:text-lg xl:text-lg">FOUNDER-PROPEX.LTD</p>
                        </div>

                        {/* Team member 2 */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img
                                    className="object-cover rounded-xl aspect-square h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-60 lg:w-60 transition duration-300 ease-in-out group-hover:blur-sm"
                                    src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="Maria Mou"
                                />
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 bg-opacity-50 rounded-xl">
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-white text-xl">
                                            <FaFacebook />
                                        </a>
                                        <a href="#" className="text-white text-xl">
                                            <FaTwitter />
                                        </a>
                                        <a href="#" className="text-white text-xl">
                                            <FaLinkedin />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Text elements (outside the blur effect) */}
                            <h1 className="mt-4 text-sm md:text-sm lg:text-xl xl:text-xl font-semibold text-gray-700 uppercase">
                                Maria Mou
                            </h1>
                            <p className="mt-2 text-gray-500 text-sm md:text-sm lg:text-lg xl:text-lg">CEO-PROPEX.LTD</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeams;
