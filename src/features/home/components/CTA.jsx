import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Ready to get started?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
                Join our community today and start sharing resources to make our campus more sustainable and connected
            </p>
            <Link
                href="/auth/register"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
                Register Now
            </Link>
        </div>
    </section>
    );
}

export default CTA;