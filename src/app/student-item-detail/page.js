
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ItemDetail() {
    // Dummy item data
    const item = {
        id: 1,
        name: 'DSLR Camera',
        category: 'Electronics',
        type: 'University Item',
        description: 'Professional Canon DSLR camera with 24-70mm lens. Perfect for photography projects, event coverage, and academic documentation. Includes camera body, lens, battery charger, and carrying case.',
        availability: 'Available',
        image: '📷',
        location: 'Equipment Room, Building A, Room 105',
        startDate: '2026-09-01',
        endDate: '2026-12-15',
        condition: 'Excellent',
    };

    // Removed user personal details from state
    const [formData, setFormData] = useState({
        purpose: '',
        startDate: '',
        endDate: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const newErrors = {};

        // Removed Name and Email validation checks

        if (!formData.purpose) {
            newErrors.purpose = 'Purpose is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle form submission
        // Note: In a real app, you would grab the userId from your auth context here
        console.log('Request submitted:', { item: item.name, ...formData });
        alert(`Request submitted for ${item.name}! You will receive a confirmation email shortly.`);
        setShowForm(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
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

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <Link href="/catalog" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Item Details */}
                    <div className="space-y-6">
                        {/* Item Image & Basic Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-8">
                            <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-9xl">{item.image}</span>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${item.availability === 'Available'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {item.availability}
                                </span>
                                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                    {item.type}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
                            <p className="text-gray-600 mb-4">{item.category}</p>

                            <p className="text-gray-700 leading-relaxed">{item.description}</p>
                        </div>

                    

                        {/* Additional Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Pickup Location</p>
                                    <p className="font-medium text-gray-900">{item.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Start Date</p>
                                    <p className="font-medium text-gray-900">{item.startDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">End Date</p>
                                    <p className="font-medium text-gray-900">{item.endDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Condition</p>
                                    <p className="font-medium text-gray-900">{item.condition}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Form */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request This Item</h2>
                            <p className="text-gray-600 mb-6">Fill out the details below to request this item</p>

                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    disabled={item.availability !== 'Available'}
                                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${item.availability === 'Available'
                                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {item.availability === 'Available' ? 'Request Item' : 'Currently Unavailable'}
                                </button>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {/* Purpose Field */}
                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-900 mb-2">
                                            Purpose of Use *
                                        </label>
                                        <textarea
                                            id="purpose"
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Describe how you plan to use this item"
                                            className={`w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none ${errors.purpose ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.purpose && (
                                            <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
                                        )}
                                    </div>

                                    {/* Date Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-900 mb-2">
                                                Start Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.startDate && (
                                                <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-900 mb-2">
                                                End Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                required
                                                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.endDate && (
                                                <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                className={`mt-0.5 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900 ${errors.agreeToTerms ? 'border-red-500' : ''
                                                    }`}
                                            />
                                            <span className="text-xs text-gray-700">
                                                I agree to return the item in good condition by the specified date and follow all borrowing guidelines.
                                            </span>
                                        </label>
                                        {errors.agreeToTerms && (
                                            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
                                        >
                                            Submit Request
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

