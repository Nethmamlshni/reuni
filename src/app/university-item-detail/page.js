
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrganizationItemDetail() {
    // 1. Item Data (With Price)
    const item = {
        id: 101,
        name: 'Professional PA Sound System',
        category: 'Audio Equipment',
        type: 'Organization Item',
        description: 'Complete Yamaha PA system suitable for large lecture halls, outdoor events, or concerts. Includes 2 main speakers, 2 monitors, 12-channel mixer, and microphone kit.',
        availability: 'Available',
        image: '🔊',
        specialInstructions: 'blah blah',
        price: 50.00, // Price per day
        currency: '$',
        condition: 'Good',
        maxDuration: 7, // Max days allowed for booking
    };

    // 2. Form State
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationType: '',
        contactPerson: '',
        email: '',
        phone: '',
        startDate: '',
        endDate: '',
        purpose: '',
        agreeToTerms: false,
    });

    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});

    // 3. Effect to Calculate Price automatically when dates change
    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start day

            if (diffDays > 0 && end >= start) {
                setDays(diffDays);
                setTotalPrice(diffDays * item.price);
            } else {
                setDays(0);
                setTotalPrice(0);
            }
        }
    }, [formData.startDate, formData.endDate, item.price]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.organizationName) newErrors.organizationName = 'Organization name is required';
        if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.endDate) newErrors.endDate = 'End date is required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const requestPayload = {
            ...formData,
            itemId: item.id,
            totalCost: totalPrice,
            daysRented: days
        };
        
        console.log('Organization Request Submitted:', requestPayload);
        alert(`Request submitted for ${formData.organizationName}. Total estimated cost: ${item.currency}${totalPrice}`);
        setShowForm(false);
    };

    // Shared input class string for consistency
    const inputClass = (error) => `w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${error ? 'border-red-500' : 'border-gray-300'}`;

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
                    
                    {/* LEFT COLUMN: Item Details */}
                    <div className="space-y-6">
                        {/* Item Image & Basic Info */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-8">
                            <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-9xl">{item.image}</span>
                            </div>

                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <div className="flex gap-2">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                        item.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {item.availability}
                                    </span>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                        {item.type}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold">Rate</span>
                                    <span className="text-xl font-bold text-gray-900">{item.currency}{item.price}<span className="text-sm font-normal text-gray-500">/day</span></span>
                                </div>
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
                                    <p className="text-sm text-gray-600 mb-1">Special Instructions</p>
                                    <p className="font-medium text-gray-900">{item.specialInstructions}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Condition</p>
                                        <p className="font-medium text-gray-900">{item.condition}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Max Duration</p>
                                        <p className="font-medium text-gray-900">{item.maxDuration} Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Request Form */}
                    <div className="lg:sticky lg:top-8 h-fit">
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization Request</h2>
                            <p className="text-gray-600 mb-6">Fill out the details below to request this item for your organization.</p>

                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    disabled={item.availability !== 'Available'}
                                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                                        item.availability === 'Available'
                                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {item.availability === 'Available' ? 'Request Item' : 'Currently Unavailable'}
                                </button>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    
                                    {/* Organization Info */}
                                    <div className="space-y-4 pt-2 pb-4 border-b border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Org Details</h3>
                                        <div>
                                            <input
                                                type="text"
                                                name="organizationName"
                                                placeholder="Organization Name *"
                                                value={formData.organizationName}
                                                onChange={handleChange}
                                                className={inputClass(errors.organizationName)}
                                            />
                                            {errors.organizationName && <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>}
                                        </div>
                                        <div>
                                            <select
                                                name="organizationType"
                                                value={formData.organizationType}
                                                onChange={handleChange}
                                                className={inputClass(false)}
                                            >
                                                <option value="">Select Organization Type...</option>
                                                <option value="Club">Student Club</option>
                                                <option value="Dept">Academic Department</option>
                                                <option value="External">External NGO</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-4 pb-4 border-b border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Person</h3>
                                        <div>
                                            <input
                                                type="text"
                                                name="contactPerson"
                                                placeholder="Full Name *"
                                                value={formData.contactPerson}
                                                onChange={handleChange}
                                                className={inputClass(errors.contactPerson)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={inputClass(false)}
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={inputClass(false)}
                                            />
                                        </div>
                                    </div>

                                    {/* Dates & Price */}
                                    <div className="space-y-4 pb-4 border-b border-gray-100">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rental Period</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date *</label>
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleChange}
                                                    className={inputClass(errors.startDate)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1">End Date *</label>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleChange}
                                                    className={inputClass(errors.endDate)}
                                                />
                                            </div>
                                        </div>

                                        {/* Price Calculation Box */}
                                        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-200">
                                            <div className="text-sm text-gray-600">
                                                <span className="font-semibold text-gray-900">{days > 0 ? days : 0} days</span> x {item.currency}{item.price}
                                            </div>
                                            <div className="text-xl font-bold text-gray-900">
                                                {item.currency}{totalPrice.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Purpose */}
                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-gray-900 mb-2">
                                            Purpose of Use
                                        </label>
                                        <textarea
                                            id="purpose"
                                            name="purpose"
                                            rows={3}
                                            placeholder="Describe how you plan to use this item..."
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className={`${inputClass(false)} resize-none`}
                                        />
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                        <label className="flex items-start gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="agreeToTerms"
                                                checked={formData.agreeToTerms}
                                                onChange={handleChange}
                                                className={`mt-0.5 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                                            />
                                            <span className="text-xs text-gray-700">
                                                I agree to cover rental costs ({item.currency}{totalPrice}) and assume responsibility for damages.
                                            </span>
                                        </label>
                                        {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
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