'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Catalog() {
    const [activeTab, setActiveTab] = useState('university');

    const universityItems = [
        {
            id: 13,
            name: 'Wooden Chairs (Set of 20)',
            category: 'Furniture',
            description: 'Sturdy wooden chairs for events, meetings, and gatherings',
            availability: 'Available',
            owner: 'University',
            image: '🪑',
        },
        {
            id: 14,
            name: 'Folding Tables (Set of 10)',
            category: 'Furniture',
            description: 'Large folding tables suitable for exhibitions and events',
            availability: 'Available',
            owner: 'University',
            image: '🪑',
        },
        {
            id: 15,
            name: 'Event Canopy Tent',
            category: 'Outdoor Equipment',
            description: '10x10 feet pop-up canopy tent for outdoor events',
            availability: 'Borrowed',
            owner: 'University',
            image: '⛺',
        },
        {
            id: 16,
            name: 'Sound System with Speakers',
            category: 'Electronics',
            description: 'Professional PA system with microphones for events',
            availability: 'Available',
            owner: 'University',
            image: '🔊',
        },
        {
            id: 17,
            name: 'Projector & Screen',
            category: 'Electronics',
            description: 'HD projector with portable projection screen',
            availability: 'Available',
            owner: 'University',
            image: '📽️',
        },
        {
            id: 18,
            name: 'Extension Cables (50m)',
            category: 'Equipment',
            description: 'Heavy-duty extension cables for events and workshops',
            availability: 'Available',
            owner: 'University',
            image: '🔌',
        },
        {
            id: 19,
            name: 'Plastic Chairs (Set of 50)',
            category: 'Furniture',
            description: 'Stackable plastic chairs for large gatherings',
            availability: 'Available',
            owner: 'University',
            image: '🪑',
        },
        {
            id: 20,
            name: 'Display Boards (Set of 5)',
            category: 'Equipment',
            description: 'Freestanding display boards for exhibitions and posters',
            availability: 'Borrowed',
            owner: 'University',
            image: '🖼️',
        },
        {
            id: 21,
            name: 'Stage Platform Sections',
            category: 'Furniture',
            description: 'Modular stage platform pieces for performances and speeches',
            availability: 'Available',
            owner: 'University',
            image: '🎭',
        },
        {
            id: 22,
            name: 'Podium with Microphone',
            category: 'Equipment',
            description: 'Wooden podium with built-in microphone stand',
            availability: 'Available',
            owner: 'University',
            image: '🎤',
        },
    ];

    const studentItems = [
        {
            id: 1,
            name: 'Textbook: Advanced Calculus',
            category: 'Books',
            description: 'Second edition, minimal highlighting, excellent condition',
            availability: 'Available',
            owner: 'Sarah M.',
            image: '📚',
        },
        {
            id: 2,
            name: 'Laptop Stand',
            category: 'Electronics',
            description: 'Adjustable aluminum laptop stand, improves posture',
            availability: 'Available',
            owner: 'John D.',
            image: '💻',
        },
        {
            id: 3,
            name: 'Lab Goggles',
            category: 'Safety Equipment',
            description: 'UV protection lab goggles for chemistry practicals',
            availability: 'Borrowed',
            owner: 'Emma L.',
            image: '🥽',
        },
        {
            id: 4,
            name: 'Graphing Calculator',
            category: 'Electronics',
            description: 'TI-84 Plus calculator with cover',
            availability: 'Available',
            owner: 'Mike R.',
            image: '🧮',
        },
        {
            id: 5,
            name: 'Drafting Kit',
            category: 'Stationery',
            description: 'Complete set with compass, protractor, and rulers',
            availability: 'Available',
            owner: 'Lisa K.',
            image: '📐',
        },
        {
            id: 6,
            name: 'Microphone for Presentations',
            category: 'Electronics',
            description: 'Wireless lavalier microphone, great for recordings',
            availability: 'Available',
            owner: 'David P.',
            image: '🎤',
        },
        {
            id: 7,
            name: 'Biology Study Guide',
            category: 'Books',
            description: 'Comprehensive guide for Cell Biology course',
            availability: 'Borrowed',
            owner: 'Rachel T.',
            image: '📖',
        },
        {
            id: 8,
            name: 'USB-C Hub',
            category: 'Electronics',
            description: '7-in-1 USB-C hub with HDMI and card reader',
            availability: 'Available',
            owner: 'Tom W.',
            image: '🔌',
        },
    ];

    const items = activeTab === 'university' ? universityItems : studentItems;

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900">UniShare</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/catalog" className="text-sm font-medium text-gray-900 transition-colors">Catalog</Link>
                            <Link href="/#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link>
                            <Link href="/#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About Us</Link>
                            <Link href="/register" className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">Register</Link>
                            <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">Browse Items</h1>
                    <p className="text-gray-600">Find and borrow items from the university and fellow students</p>
                </div>
            </section>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('university')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'university'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            University Items
                        </button>
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === 'students'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Student Items
                        </button>
                    </div>
                </div>
            </div>

            {/* Items Grid */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                                        {item.image}
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${item.availability === 'Available'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {item.availability}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>

                                {item.owner && (
                                    <p className="text-xs text-gray-500 mb-2">Listed by {item.owner}</p>
                                )}

                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">{item.category}</span>
                                    <button
                                        disabled={item.availability === 'Borrowed'}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${item.availability === 'Available'
                                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {item.availability === 'Available' ? 'view' : 'Unavailable'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-200 bg-white mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </div>
                            <span className="text-sm font-bold text-gray-900">UniShare</span>
                        </div>

                        <div className="flex gap-8">
                            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a>
                        </div>

                        <p className="text-xs text-gray-500">© 2026 UniShare. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}