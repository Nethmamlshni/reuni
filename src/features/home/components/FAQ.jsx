// FAQ Section Component
'use client';
import React, { useState } from 'react';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
                Frequently Asked Questions
            </h2>

            <div className="space-y-3 sm:space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleFaq(0)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === 0}
                    >
                        <span className="font-medium text-gray-900 text-left text-sm sm:text-base">Q1. What items can be borrowed?</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${openFaq === 0 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openFaq === 0 && (
                        <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 animate-fade-in">
                            <p>You can borrow a wide variety of items including textbooks, electronics, sports equipment, and more. Browse our gallery to see what&apos;s currently available.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleFaq(1)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === 1}
                    >
                        <span className="font-medium text-gray-900 text-left text-sm sm:text-base">Q2. How do I list my own items?</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${openFaq === 1 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openFaq === 1 && (
                        <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 animate-fade-in">
                            <p>After registering and logging in, navigate to your dashboard where you can create new listings with photos, descriptions, and availability.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleFaq(2)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === 2}
                    >
                        <span className="font-medium text-gray-900 text-left text-sm sm:text-base">Q3. Do students and staff have different access?</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${openFaq === 2 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openFaq === 2 && (
                        <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 animate-fade-in">
                            <p>Yes, the platform has role-based access. Students can browse and request items, while university administrators have additional oversight and management capabilities.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleFaq(3)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === 3}
                    >
                        <span className="font-medium text-gray-900 text-left text-sm sm:text-base">Q4. How long can I borrow items?</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${openFaq === 3 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openFaq === 3 && (
                        <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 animate-fade-in">
                            <p>Borrowing periods vary by item and are set by the lender. You&apos;ll see the availability and terms when you request an item.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                        onClick={() => toggleFaq(4)}
                        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        aria-expanded={openFaq === 4}
                    >
                        <span className="font-medium text-gray-900 text-left text-sm sm:text-base">Q5. Is my personal information safe?</span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-2 ${openFaq === 4 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {openFaq === 4 && (
                        <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-600 animate-fade-in">
                            <p>Yes, we take privacy seriously. Your personal information is protected and only shared with other users when necessary for facilitating transactions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
    );
};

export default FAQ;