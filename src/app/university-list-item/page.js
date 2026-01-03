'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UniversityListItem() {
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        description: '',
        condition: '',
        brand: '',
        model: '',
        serialNumber: '',
        yearAcquired: '',
        images: null,
        location: '',
        rentalRate: '',
        maxBorrowDuration: '',
        requiresTraining: false,
        specialInstructions: '',
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

        if (!formData.location) {
            newErrors.location = 'Location is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('University Item Added:', formData);
        alert('University item added successfully! It is now available in the catalog.');
        window.location.href = '/dashboard';
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
           

            {/* Main Content */}
            <main className="flex-1 py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add University Item</h1>
                        <p className="text-gray-600">Add a new item to the university's shared equipment catalog</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Item Details */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Item Information
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
                                            placeholder="e.g., DSLR Camera, Projector, Microscope"
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
                                            <option value="electronics">Electronics</option>
                                            <option value="lab_equipment">Lab Equipment</option>
                                            <option value="camping">Camping & Outdoor</option>
                                            <option value="office">Office Supplies</option>
                                            <option value="av_equipment">AV Equipment</option>
                                            <option value="sports">Sports Equipment</option>
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
                                            placeholder="Detailed description of the item, its features, and intended use cases"
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
                                        </select>
                                    </div>
                                       <div>
                                        <label htmlFor="rentalRate" className="block text-sm font-medium text-gray-900 mb-2">
                                            Rental Rate per day ($) *
                                        </label>
                                        <div className="relative">
                                            {/* Currency Symbol */}
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                id="rentalRate"
                                                name="rentalRate"
                                                value={formData.rentalRate}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01" // Allows for cents (e.g., 10.50)
                                                placeholder="0.00"
                                                className="w-full pl-7 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>          
                                    <div>
                                        <label htmlFor="images" className="block text-sm font-medium text-gray-900 mb-2">
                                            Item Photos
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
                                    </div>
                                </div>
                            </div>

                            {/* Location & Availability */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                    Availability
                                </h2>

                                <div className="space-y-4">
                                    

                                  

                                    <div>
                                        <label htmlFor="maxBorrowDuration" className="block text-sm font-medium text-gray-900 mb-2">
                                            Maximum Borrow Duration
                                        </label>
                                        <select
                                            id="maxBorrowDuration"
                                            name="maxBorrowDuration"
                                            value={formData.maxBorrowDuration}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select duration</option>
                                            <option value="1 day">1 day</option>
                                            <option value="3 days">3 days</option>
                                            <option value="7 days">7 days (1 week)</option>
                                            <option value="14 days">14 days (2 weeks)</option>
                                            <option value="30 days">30 days (1 month)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-900 mb-2">
                                            Special Instructions
                                        </label>
                                        <textarea
                                            id="specialInstructions"
                                            name="specialInstructions"
                                            value={formData.specialInstructions}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Any special care instructions, setup requirements, or usage notes"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm"
                                >
                                    Add Item to Catalog
                                </button>
                                <Link
                                    href="/dashboard"
                                    className="px-6 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            
        </div>
    );
}
