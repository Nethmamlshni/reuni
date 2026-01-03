
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StudentListItem() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        condition: '',
        availableFrom: '',
        availableUntil: '',
        pickupLocations: '', // User types "Library, Cafe" -> we convert to Array
        specialConditions: '',
        tags: '', // User types "math, book" -> we convert to Array
        requireDeposit: false,
        photos: [], // Stores Base64 strings
        termsAgreed: false,
    });

    const [errors, setErrors] = useState({});

    // --- Handle Image Conversion to Base64 ---
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Limit to 5 images for performance
        if (files.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(promises)
            .then((base64Images) => {
                setFormData((prev) => ({ ...prev, photos: base64Images }));
            })
            .catch((error) => console.error("Error converting images", error));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // --- Client Validation ---
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.condition) newErrors.condition = 'Condition is required';
        if (!formData.availableFrom) newErrors.availableFrom = 'Start date is required';
        if (!formData.availableUntil) newErrors.availableUntil = 'End date is required';
        if (!formData.pickupLocations) newErrors.pickupLocations = 'Pickup location is required';
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to terms';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            window.scrollTo(0,0);
            return;
        }

        setIsSubmitting(true);

        try {
            // --- Transform Data for Backend ---
            const locationsArray = formData.pickupLocations.split(',').map(s => s.trim()).filter(s => s);
            const tagsArray = formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(s => s) : [];

            const payload = {
                title: formData.title,
                // MOCK USER ID: Replace with actual auth session ID
                userId: "654321999999999999999999", 
                category: formData.category,
                description: formData.description,
                condition: formData.condition,
                availableFrom: formData.availableFrom,
                availableUntil: formData.availableUntil,
                pickupLocations: locationsArray,
                requireDeposit: formData.requireDeposit,
                specialConditions: formData.specialConditions,
                tags: tagsArray,
                photos: formData.photos, // Sending Base64 array
            };

            // --- Send to API ---
            const response = await fetch('/api/itemoffer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to list item');
            }

            alert('Item listed successfully!');
            router.push('/student/dashboard'); // Corrected path

        } catch (error) {
            console.error('Error:', error);
            alert(`Submission Failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (error) => `w-full px-4 py-3 bg-white border rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all ${error ? 'border-red-500' : 'border-green-300'}`;

    return (
        <div className="min-h-screen bg-green-50 flex flex-col">
            <main className="flex-1 py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Link href="/student/dashboard" className="inline-flex items-center text-sm text-green-600 hover:text-green-800 mb-4">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-green-900 mb-2">List a New Item</h1>
                        <p className="text-green-700">Share your item with other students on campus</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-green-200 p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* --- Item Details --- */}
                            <div>
                                <h2 className="text-lg font-bold text-green-900 mb-4 pb-2 border-b border-green-200">Item Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Item Name *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={inputClass(errors.title)}
                                            placeholder="e.g., Calculus Textbook"
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-green-900 mb-2">Category *</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className={inputClass(errors.category)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Books">Books</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Tools">Tools</option>
                                                <option value="Stationery">Stationery</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-900 mb-2">Condition *</label>
                                            <select
                                                name="condition"
                                                value={formData.condition}
                                                onChange={handleChange}
                                                className={inputClass(errors.condition)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="New">New</option>
                                                <option value="Like New">Like New</option>
                                                <option value="Good">Good</option>
                                                <option value="Fair">Fair</option>
                                                <option value="Poor">Poor</option>
                                            </select>
                                            {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={4}
                                            className={`${inputClass(errors.description)} resize-none`}
                                            placeholder="Details about the item..."
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Item Photos *</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg text-green-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-900 file:font-medium hover:file:bg-green-200"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            {formData.photos.length > 0 ? `${formData.photos.length} photos selected` : "Upload up to 5 photos"}
                                        </p>
                                        {errors.photos && <p className="mt-1 text-sm text-red-600">{errors.photos}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* --- Logistics --- */}
                            <div>
                                <h2 className="text-lg font-bold text-green-900 mb-4 pb-2 border-b border-green-200">Availability & Logistics</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-green-900 mb-2">Available From *</label>
                                            <input
                                                type="date"
                                                name="availableFrom"
                                                value={formData.availableFrom}
                                                onChange={handleChange}
                                                className={inputClass(errors.availableFrom)}
                                            />
                                            {errors.availableFrom && <p className="mt-1 text-sm text-red-600">{errors.availableFrom}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-green-900 mb-2">Available Until *</label>
                                            <input
                                                type="date"
                                                name="availableUntil"
                                                value={formData.availableUntil}
                                                onChange={handleChange}
                                                className={inputClass(errors.availableUntil)}
                                            />
                                            {errors.availableUntil && <p className="mt-1 text-sm text-red-600">{errors.availableUntil}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Pickup Locations *</label>
                                        <input
                                            type="text"
                                            name="pickupLocations"
                                            value={formData.pickupLocations}
                                            onChange={handleChange}
                                            className={inputClass(errors.pickupLocations)}
                                            placeholder="e.g., Library, Student Center (comma separated)"
                                        />
                                        {errors.pickupLocations && <p className="mt-1 text-sm text-red-600">{errors.pickupLocations}</p>}
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <input 
                                            type="checkbox" 
                                            name="requireDeposit" 
                                            checked={formData.requireDeposit} 
                                            onChange={handleChange} 
                                            className="w-4 h-4 rounded border-green-300 text-green-600 focus:ring-green-600"
                                        />
                                        <span className="text-sm text-gray-700">Require a deposit?</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Special Conditions (Optional)</label>
                                        <textarea
                                            name="specialConditions"
                                            value={formData.specialConditions}
                                            onChange={handleChange}
                                            rows={2}
                                            className={`${inputClass(false)} resize-none`}
                                            placeholder="e.g., Must return by Friday 5PM"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-green-900 mb-2">Tags (Optional)</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleChange}
                                            className={inputClass(false)}
                                            placeholder="e.g., math, calculator (comma separated)"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- Submit --- */}
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="termsAgreed"
                                        checked={formData.termsAgreed}
                                        onChange={handleChange}
                                        className={`mt-1 w-4 h-4 border-green-300 rounded text-green-600 focus:ring-green-600 ${errors.termsAgreed ? 'border-red-500' : ''}`}
                                    />
                                    <span className="text-sm text-green-800">I confirm that I own this item and have the right to share it.</span>
                                </label>
                                {errors.termsAgreed && <p className="mt-2 text-sm text-red-600">{errors.termsAgreed}</p>}
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 px-6 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all ${isSubmitting ? 'opacity-70' : ''}`}
                                >
                                    {isSubmitting ? 'Uploading & Listing...' : 'List Item'}
                                </button>
                                <Link
                                    href="/student/dashboard"
                                    className="px-6 py-4 bg-white border border-green-300 text-green-700 rounded-lg font-bold hover:bg-green-50 transition-all text-center"
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