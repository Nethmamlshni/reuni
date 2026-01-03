
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateItemRequest() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state matching your ItemRequest Schema
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        purpose: '',
        neededByDate: '',
        flexibleDate: false,
        urgencyLevel: '',
        durationNeeded: '',
        pickupLocation: '',
        flexibleLocation: false,
        specialInstructions: '',
        tags: '', 
        termsAgreed: false,
    });

    const [errors, setErrors] = useState({});

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // --- Validation ---
        const newErrors = {};

        if (!formData.title || formData.title.length < 3) 
            newErrors.title = 'Title must be at least 3 characters';
        
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.purpose) newErrors.purpose = 'Purpose is required';
        
        if (!formData.neededByDate) {
            newErrors.neededByDate = 'Date is required';
        } else {
            const today = new Date();
            today.setHours(0,0,0,0);
            if (new Date(formData.neededByDate) < today) {
                newErrors.neededByDate = 'Date cannot be in the past';
            }
        }

        if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';
        if (!formData.durationNeeded) newErrors.durationNeeded = 'Duration is required';
        if (!formData.pickupLocation) newErrors.pickupLocation = 'Location is required';
        if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to the terms';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            window.scrollTo(0, 0); 
            return;
        }

        setIsSubmitting(true);

        try {
            // Transform tags string to Array
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
                : [];

            // Construct Payload
            const payload = {
                ...formData,
                tags: tagsArray,
                // MOCK USER ID: Replace with actual auth session ID in production
                userId: "654321999999999999999999", 
            };

            const response = await fetch('/api/itemreq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.details || 'Failed to submit request');
            }

            alert('Request submitted successfully!');
            router.push('/student-dashboard'); 

        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (error) => `w-full px-4 py-3 bg-white border rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all ${error ? 'border-red-500' : 'border-green-300'}`;

    return (
        <div className="min-h-screen bg-green-50 flex flex-col">
            {/* Navbar Placeholder */}
            <nav className="bg-white border-b border-green-200 px-6 py-4 mb-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-green-700">UniShare</span>
                    <Link href="/student-dashboard" className="text-sm font-medium text-green-600 hover:text-green-800">
                        Cancel & Exit
                    </Link>
                </div>
            </nav>

            <main className="flex-1 px-6 pb-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-green-900 mb-2">Request an Item</h1>
                        <p className="text-green-700">Tell the community what you need, and we'll help you find it.</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-green-200 p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* --- Item Details --- */}
                            <div>
                                <h2 className="text-lg font-bold text-green-900 mb-4 pb-2 border-b border-green-200">
                                    Item Details
                                </h2>
                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Request Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g., Scientific Calculator for Exam"
                                            className={inputClass(errors.title)}
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Category *</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={inputClass(errors.category)}
                                        >
                                            <option value="">Select Category...</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Books">Books</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Tools">Tools</option>
                                            <option value="Stationery">Stationery</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Describe the specific item you are looking for..."
                                            className={`${inputClass(errors.description)} resize-none`}
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    {/* Purpose */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Purpose *</label>
                                        <textarea
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            rows={2}
                                            placeholder="Why do you need this item?"
                                            className={`${inputClass(errors.purpose)} resize-none`}
                                        />
                                        {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* --- Logistics --- */}
                            <div>
                                <h2 className="text-lg font-bold text-green-900 mb-4 pb-2 border-b border-green-200">
                                    Logistics & Timing
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Needed By Date */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Needed By Date *</label>
                                        <input
                                            type="date"
                                            name="neededByDate"
                                            value={formData.neededByDate}
                                            onChange={handleChange}
                                            className={inputClass(errors.neededByDate)}
                                        />
                                        {errors.neededByDate && <p className="mt-1 text-sm text-red-600">{errors.neededByDate}</p>}
                                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="flexibleDate"
                                                checked={formData.flexibleDate}
                                                onChange={handleChange}
                                                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                            />
                                            <span className="text-xs text-green-700">I am flexible with this date</span>
                                        </label>
                                    </div>

                                    {/* Urgency Level */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Urgency Level *</label>
                                        <select
                                            name="urgencyLevel"
                                            value={formData.urgencyLevel}
                                            onChange={handleChange}
                                            className={inputClass(errors.urgencyLevel)}
                                        >
                                            <option value="">Select Level...</option>
                                            <option value="Low">Low (Whenever possible)</option>
                                            <option value="Medium">Medium (Need soon)</option>
                                            <option value="High">High (Urgent/Emergency)</option>
                                        </select>
                                        {errors.urgencyLevel && <p className="mt-1 text-sm text-red-600">{errors.urgencyLevel}</p>}
                                    </div>

                                    {/* Duration Needed */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Duration Needed *</label>
                                        <input
                                            type="text"
                                            name="durationNeeded"
                                            value={formData.durationNeeded}
                                            onChange={handleChange}
                                            placeholder="e.g., 2 days, 1 week"
                                            className={inputClass(errors.durationNeeded)}
                                        />
                                        {errors.durationNeeded && <p className="mt-1 text-sm text-red-600">{errors.durationNeeded}</p>}
                                    </div>

                                    {/* Pickup Location */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Preferred Location *</label>
                                        <input
                                            type="text"
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleChange}
                                            placeholder="e.g., Main Library"
                                            className={inputClass(errors.pickupLocation)}
                                        />
                                        {errors.pickupLocation && <p className="mt-1 text-sm text-red-600">{errors.pickupLocation}</p>}
                                        <label className="flex items-center gap-2 mt-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="flexibleLocation"
                                                checked={formData.flexibleLocation}
                                                onChange={handleChange}
                                                className="w-4 h-4 rounded border-green-300 text-green-600 focus:ring-green-600"
                                            />
                                            <span className="text-xs text-green-700">I am flexible with location</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Special Instructions */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-green-900 mb-2">Special Instructions (Optional)</label>
                                    <textarea
                                        name="specialInstructions"
                                        value={formData.specialInstructions}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Any specific requirements..."
                                        className={`${inputClass(false)} resize-none`}
                                    />
                                </div>

                                {/* Tags */}
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-green-900 mb-2">Tags (Optional)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="e.g., math, calculator, exam (comma separated)"
                                        className={inputClass(false)}
                                    />
                                </div>
                            </div>

                            {/* --- Submit Section --- */}
                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="termsAgreed"
                                        checked={formData.termsAgreed}
                                        onChange={handleChange}
                                        className={`mt-1 w-4 h-4 border-green-300 rounded text-green-600 focus:ring-green-600 ${errors.termsAgreed ? 'border-red-500' : ''}`}
                                    />
                                    <span className="text-sm text-green-800">
                                        I confirm this is a genuine request.
                                    </span>
                                </label>
                                {errors.termsAgreed && <p className="mt-2 text-sm text-red-600">{errors.termsAgreed}</p>}
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Post Request'}
                                </button>
                                <Link
                                    href="/student/dashboard"
                                    className="px-6 py-4 bg-white border border-green-300 text-green-700 rounded-xl font-bold text-lg hover:bg-green-50 transition-all text-center"
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