
const OurTeams = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="xl:flex xl:items-center xl:-mx-4">
                    <div className="xl:w-1/2 xl:mx-4">
                        <h1 className="text-center font-bold xl:text-3xl mt-4 uppercase">Meet Our Leadership</h1>
                        <div className="flex justify-center items-center">
                            <p className="max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
                            Meet our dedicated team driving our success, each contributing unique skills to our mission.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
                        <div>
                            <div className="flex justify-center items-center">
                                <img
                                    className="object-cover rounded-xl aspect-square h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-60 lg:w-60"
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                    alt="John Doe"
                                />
                            </div>
                            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Shahnawaz Sazid</h1>
                            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">FOUNDER-PROPEX.LTD</p>
                        </div>

                        <div>
                            <div className="flex justify-center items-center">
                                <img
                                    className="object-cover rounded-xl aspect-square h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-60 lg:w-60"
                                    src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    alt="Mia"
                                />
                            </div>
                            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Maria Mou</h1>
                            <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">CEO-PROPEX.LTD</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeams;