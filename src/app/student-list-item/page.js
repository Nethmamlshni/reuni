'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudentListItem() {
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        description: '',
        condition: '',
        images: null,
        availableFrom: '',
        availableUntil: '',
        pickupLocation: '',
        termsAgreed: false,
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.itemName) {
            newErrors.itemName = 'Item name is required';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (!formData.description) {
            newErrors.description = 'Description is required';
        }

        if (!formData.termsAgreed) {
            newErrors.termsAgreed = 'You must agree to the terms';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Student Item Listed:', formData);
        alert('Item listed successfully! It will be visible in the catalog once approved.');
        window.location.href = '/student-dashboard';
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files : value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
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

                        <div className="flex items-center gap-4">
                            <Link href="/student-dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
                            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">ST</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Link href="/student-dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">List a New Item</h1>
                        <p className="text-gray-600">Share your item with other students on campus</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Item Details */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Item Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="itemName" className="block text-sm font-medium text-gray-900 mb-2">
                                            Item Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="itemName"
                                            name="itemName"
                                            value={formData.itemName}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., Calculus Textbook, Graphing Calculator"
                                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${errors.itemName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.itemName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.itemName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${errors.category ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="books">Books & Textbooks</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="clothing">Clothing & Accessories</option>
                                            <option value="sports">Sports Equipment</option>
                                            <option value="appliances">Appliances</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {errors.category && (
                                            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Provide details about the item, its features, and condition"
                                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="condition" className="block text-sm font-medium text-gray-900 mb-2">
                                            Condition *
                                        </label>
                                        <select
                                            id="condition"
                                            name="condition"
                                            value={formData.condition}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select condition</option>
                                            <option value="new">New</option>
                                            <option value="excellent">Excellent</option>
                                            <option value="good">Good</option>
                                            <option value="fair">Fair</option>
                                            <option value="poor">Poor</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="images" className="block text-sm font-medium text-gray-900 mb-2">
                                            Item Photos (Optional)
                                        </label>
                                        <input
                                            type="file"
                                            id="images"
                                            name="images"
                                            onChange={handleChange}
                                            multiple
                                            accept="image/*"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-900 file:font-medium hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Upload up to 5 photos of your item</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Availability
                                </h2>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-900 mb-2">
                                                Available From
                                            </label>
                                            <input
                                                type="date"
                                                id="availableFrom"
                                                name="availableFrom"
                                                value={formData.availableFrom}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="availableUntil" className="block text-sm font-medium text-gray-900 mb-2">
                                                Available Until
                                            </label>
                                            <input
                                                type="date"
                                                id="availableUntil"
                                                name="availableUntil"
                                                value={formData.availableUntil}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-900 mb-2">
                                            Pickup/Exchange Location
                                        </label>
                                        <input
                                            type="text"
                                            id="pickupLocation"
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleChange}
                                            placeholder="e.g., Library Cafe, Dorm Building C"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="termsAgreed"
                                        checked={formData.termsAgreed}
                                        onChange={handleChange}
                                        className={`mt-1 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900 ${errors.termsAgreed ? 'border-red-500' : ''
                                            }`}
                                    />
                                    <span className="text-sm text-gray-700">
                                        I confirm that I own this item and have the right to share it. I will maintain the item in good condition and respond to borrowing requests promptly. I understand that all sharing is free of charge.
                                    </span>
                                </label>
                                {errors.termsAgreed && (
                                    <p className="mt-2 text-sm text-red-600">{errors.termsAgreed}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    List Item
                                </button>
                                <Link
                                    href="/student-dashboard"
                                    className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-6 border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xs text-gray-500">© 2026 UniShare. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

