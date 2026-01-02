import Image from 'next/image';

const Features = () => {
    return (
        <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
                    Features
                </h2>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-6 order-2 md:order-1">
                        <div className="flex items-start gap-4">
                            <div
                                className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-1">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">
                                    Browse all available items
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Explore items from freely available students, lenders, and university organizations
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-1">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">
                                    Request items easily
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Simple request process to borrow items from the community
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div
                                className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-1">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                          d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg">
                                    Track your borrowing activity
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Manage your listings, requests, and borrowing history in one place
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <Image
                            src="https://placehold.co/600x400"
                            alt="Features illustration showing the borrowing platform interface"
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Features;