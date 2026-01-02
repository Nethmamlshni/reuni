'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const myBorrowedItems = [
        { id: 1, item: 'DSLR Camera', from: 'University', dueDate: 'Jan 15, 2026', status: 'Active' },
        { id: 2, item: 'Calculus Textbook', from: 'Emma L.', dueDate: 'Feb 1, 2026', status: 'Active' },
    ];

    const myListedItems = [
        { id: 1, item: 'Graphing Calculator', category: 'Electronics', status: 'Available', requests: 2 },
        { id: 2, item: 'Biology Lab Coat', category: 'Clothing', status: 'Borrowed', requests: 0 },
        { id: 3, item: 'Yoga Mat', category: 'Sports', status: 'Available', requests: 1 },
    ];

    const myRequests = [
        { id: 1, item: 'Projector', type: 'University', date: 'Jan 2, 2026', status: 'Pending' },
        { id: 2, item: 'Tent', type: 'University', date: 'Dec 30, 2025', status: 'Approved' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
                    <p className="text-gray-600">Manage your items, borrowings, and requests</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{myBorrowedItems.length}</p>
                        <p className="text-sm text-gray-600">Items Borrowed</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{myListedItems.length}</p>
                        <p className="text-sm text-gray-600">My Listings</p>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
                        <p className="text-sm text-gray-600">Active Requests</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'overview'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('borrowed')}
                            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'borrowed'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Borrowed Items
                        </button>
                        <button
                            onClick={() => setActiveTab('listings')}
                            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'listings'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            My Listings
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'requests'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            My Requests
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Quick Summary */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Active Borrowings</span>
                                        <span className="font-semibold text-gray-900">{myBorrowedItems.length} items</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Items Listed</span>
                                        <span className="font-semibold text-gray-900">{myListedItems.length} items</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Pending Requests</span>
                                        <span className="font-semibold text-amber-600">{myRequests.filter(r => r.status === 'Pending').length} pending</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Incoming Requests</span>
                                        <span className="font-semibold text-gray-900">{myRequests.length} requests</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Link href="/catalog" className="block w-full px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all text-center">
                                        Browse Available Items
                                    </Link>
                                    <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-left flex items-center justify-between">
                                        <span>List a New Item</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'borrowed' && (
                    <div className="bg-white rounded-xl border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Items You're Borrowing</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {myBorrowedItems.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                {item.item.includes('Camera') ? '📷' : '📚'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.item}</p>
                                                <p className="text-sm text-gray-600">From: {item.from}</p>
                                                <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                {item.status}
                                            </span>
                                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                                                Return
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'listings' && (
                    <div className="bg-white rounded-xl border border-gray-200">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Your Listed Items</h3>
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                                Add New Item
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {myListedItems.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                {item.item.includes('Calculator') ? '🧮' : item.item.includes('Lab') ? '🥼' : '🧘'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.item}</p>
                                                <p className="text-sm text-gray-600">{item.category}</p>
                                                {item.requests > 0 && (
                                                    <p className="text-xs text-blue-600 mt-1">{item.requests} pending request(s)</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Available'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {item.status}
                                            </span>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="bg-white rounded-xl border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900">Your Requests</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date Requested</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {myRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{request.item}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                    {request.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${request.status === 'Pending'
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all">
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
