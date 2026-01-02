// About section component for the home page

const About = () => {
    return (
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    About Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                    This University Management Platform is an educational project built to demonstrate modern web development practices and sustainable resource sharing concepts.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Created as a learning project to showcase full-stack development skills, database design, and user experience principles with a focus on campus community collaboration.
                </p>
            </div>
        </section>
    );
}

export default About;