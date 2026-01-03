'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        degreeProgram: '',
        yearOfStudy: '',
        code: '',
        phoneNumber: '',
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms';
        }

        if (!formData.degreeProgram) {
            newErrors.degreeProgram = 'Please select a degree program';
        }

        if (!formData.yearOfStudy) {
            newErrors.yearOfStudy = 'Please select year of study';
        }

        if (!formData.code) {
            newErrors.code = 'Verification code is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setApiError('');

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    degreeProgram: formData.degreeProgram,
                    yearOfStudy: formData.yearOfStudy,
                    code: formData.code,
                    phoneNumber: formData.phoneNumber,
                    role: 'user',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            router.push('/auth/login');

        } catch (err) {
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }

        // Reset email sent status if email changes
        if (name === 'email' && emailSent) {
            setEmailSent(false);
            setEmailMessage('');
        }
    };

    const handleNextStep = () => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstname) newErrors.firstname = 'First name is required';
            if (!formData.lastname) newErrors.lastname = 'Last name is required';
            if (!formData.username) newErrors.username = 'Username is required';
            if (!formData.email) newErrors.email = 'Email is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStep(2);
    };

    const handleSendVerificationCode = async () => {
        if (!formData.email) {
            setErrors({ ...errors, email: 'Email is required to send verification code' });
            return;
        }

        // Validate UWU email format
        const emailRegex = /^[a-zA-Z]{3,4}\d{5}@std\.uwu\.ac\.lk$/;
        if (!emailRegex.test(formData.email.trim().toLowerCase())) {
            setErrors({ ...errors, email: 'Invalid UWU email format (e.g., abc12345@std.uwu.ac.lk)' });
            return;
        }

        setSendingCode(true);
        setEmailMessage('');
        setApiError('');

        try {
            const response = await fetch('/api/emailCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send verification code');
            }

            setEmailSent(true);
            setEmailMessage('Verification code sent to your email!');
            
            // Clear any previous email errors
            if (errors.email) {
                setErrors({ ...errors, email: '' });
            }
        } catch (err) {
            setEmailMessage('');
            setApiError(err.message);
        } finally {
            setSendingCode(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join the UniShare community</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                        {apiError && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{apiError}</p>
                            </div>
                        )}

                        <div className="mb-6 flex justify-between items-center">
                            <div className={`flex-1 h-1 rounded ${step >= 1 ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                            <div className="mx-2"></div>
                            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
                        </div>

                        {step === 1 && (
                            <form className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-900 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-900 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            required
                                            className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="Choose a username"
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                        University Email
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="abc12345@std.uwu.ac.lk"
                                            className={`flex-1 px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendVerificationCode}
                                            disabled={sendingCode || !formData.email}
                                            className="px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 whitespace-nowrap"
                                        >
                                            {sendingCode ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                'Send Code'
                                            )}
                                        </button>
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    {emailMessage && (
                                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                            <p className="text-sm text-green-600">{emailMessage}</p>
                                        </div>
                                    )}
                                    <p className="mt-2 text-xs text-gray-500">
                                        Enter your UWU email to receive verification code
                                    </p>
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+94 XX XXX XXXX"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!emailSent}
                                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all shadow-sm ${emailSent ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    {emailSent ? 'Next Step' : 'Verify Email First'}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-900 mb-2">
                                        Degree Program
                                    </label>
                                    <select
                                        id="degreeProgram"
                                        name="degreeProgram"
                                        value={formData.degreeProgram}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.degreeProgram ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select Program</option>
                                        <option value="ICT">ICT</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.degreeProgram && <p className="mt-1 text-sm text-red-600">{errors.degreeProgram}</p>}
                                </div>

                                <div>
                                    <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-900 mb-2">
                                        Year of Study
                                    </label>
                                    <select
                                        id="yearOfStudy"
                                        name="yearOfStudy"
                                        value={formData.yearOfStudy}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.yearOfStudy ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                    </select>
                                    {errors.yearOfStudy && <p className="mt-1 text-sm text-red-600">{errors.yearOfStudy}</p>}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="code" className="block text-sm font-medium text-gray-900">
                                            Verification Code
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleSendVerificationCode}
                                            className="text-sm text-gray-900 font-medium hover:underline"
                                        >
                                            Resend Code
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="code"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter 6-digit code from email"
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                                    {emailMessage && (
                                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                                            <p className="text-sm text-green-600">{emailMessage}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Minimum 8 characters"
                                        disabled={loading}
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Re-enter password"
                                        disabled={loading}
                                        className={`w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                </div>

                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className={`mt-1 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                                        />
                                        <span className="text-sm text-gray-600">
                                            I agree to the{' '}
                                            <a href="#" className="text-gray-900 font-medium hover:underline">
                                                Terms of Service
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-gray-900 font-medium hover:underline">
                                                Privacy Policy
                                            </a>
                                        </span>
                                    </label>
                                    {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        disabled={loading}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/login" className="text-gray-900 font-semibold hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            Student registration only. UWU email required for verification.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}