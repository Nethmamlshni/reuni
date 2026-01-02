'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UniversityDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalItems: 0, activeUsers: 0, pendingRequests: 0, activeBorrows: 0 });
    const [pendingRequests, setPendingRequests] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    
 const dummyPendingRequests = [
  {
    id: 4,
    item: 'Chemistry Lab Coat',
    requester: 'Nimal Perera',
    studentId: 'UWU/ICT/22/041',
    email: 'nimal.p@university.edu',
    date: 'Jan 3, 2026',
    type: 'Student',
    owner: 'Department of Chemistry',
  },
  {
    id: 5,
    item: 'Engineering Safety Boots',
    requester: 'Kasun Wijesinghe',
    studentId: 'UWU/ICT/22/058',
    email: 'kasun.w@university.edu',
    date: 'Jan 3, 2026',
    type: 'Student',
    owner: 'Civil Engineering Lab',
  },
  {
    id: 6,
    item: 'Casio FX-991EX Calculator',
    requester: 'Sanduni Jayawardena',
    studentId: 'UWU/ICT/22/073',
    email: 'sanduni.j@university.edu',
    date: 'Jan 2, 2026',
    type: 'Student',
    owner: 'Maths Society',
  },
  {
    id: 7,
    item: 'Digital Multimeter',
    requester: 'Isuru Madushan',
    email: 'isuru.m@university.edu',
    date: 'Jan 2, 2026',
    type: 'University',
  },
  {
    id: 8,
    item: 'Field Survey Measuring Tape',
    requester: 'Ruwan Karunaratne',
    email: 'ruwan.k@university.edu',
    date: 'Jan 1, 2026',
    type: 'University',
  },
];


const dummyRecentActivity = [
  {
    id: 5,
    action: 'Item borrowed',
    item: 'Engineering Helmet',
    user: 'Kasun Wijesinghe',
    studentId: 'UWU/ICT/22/058',
    time: '1 hour ago',
  },
  {
    id: 6,
    action: 'Item returned',
    item: 'Drawing Board Set',
    user: 'Ruwan Karunaratne',
    studentId: 'UWU/ICT/22/091',
    time: '4 hours ago',
  },
  {
    id: 7,
    action: 'New listing created',
    item: 'Rain Boots',
    user: 'Ayesha Fernando',
    studentId: 'UWU/ICT/22/066',
    time: '6 hours ago',
  },
  {
    id: 8,
    action: 'Request approved',
    item: 'Chemistry Lab Glassware Set',
    user: 'Department of Chemistry',
    time: '12 hours ago',
  },
  {
    id: 9,
    action: 'Item reserved',
    item: 'Field Work Backpack',
    user: 'Sanduni Jayawardena',
    studentId: 'UWU/ICT/22/073',
    time: '1 day ago',
  },
];



    const dummyStats = {
        totalItems: 24,
        activeUsers: 156,
        pendingRequests: 3,
        activeBorrows: 18
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch stats
            const statsResponse = await fetch('/api/admin/stats');
            if (!statsResponse.ok) throw new Error('Failed to fetch stats');
            const statsData = await statsResponse.json();
            setStats(statsData);

            // Fetch pending requests
            const requestsResponse = await fetch('/api/admin/requests/pending');
            if (!requestsResponse.ok) throw new Error('Failed to fetch requests');
            const requestsData = await requestsResponse.json();
            setPendingRequests(requestsData);

            // Fetch recent activity
            const activityResponse = await fetch('/api/admin/activity/recent');
            if (!activityResponse.ok) throw new Error('Failed to fetch activity');
            const activityData = await activityResponse.json();
            setRecentActivity(activityData);

        } catch (err) {
            console.warn('Error fetching dashboard data, using dummy data:', err);
            // Use dummy data as fallback
            setStats(dummyStats);
            setPendingRequests(dummyPendingRequests);
            setRecentActivity(dummyRecentActivity);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveRequest = async (requestId) => {
        try {
            const response = await fetch(`/api/admin/requests/${requestId}/approve`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to approve request');
            // Refresh data
            fetchDashboardData();
        } catch (err) {
            console.error('Error approving request:', err);
            alert('Failed to approve request');
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const response = await fetch(`/api/admin/requests/${requestId}/reject`, {
                method: 'POST',
            });
            if (!response.ok) throw new Error('Failed to reject request');
            // Refresh data
            fetchDashboardData();
        } catch (err) {
            console.error('Error rejecting request:', err);
            alert('Failed to reject request');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">University Dashboard</h1>
                    <p className="text-gray-600">Manage platform items, requests, and users</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading dashboard...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                                <p className="text-sm text-gray-600">Total Items</p>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                                <p className="text-sm text-gray-600">Active Users</p>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                                <p className="text-sm text-gray-600">Pending Requests</p>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeBorrows}</p>
                                <p className="text-sm text-gray-600">Active Borrows</p>
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
                                    onClick={() => setActiveTab('requests')}
                                    className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'requests'
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Pending Requests
                                </button>
                                <button
                                    onClick={() => setActiveTab('items')}
                                    className={`pb-3 px-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'items'
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Manage Items
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Recent Activity */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                    <p className="text-sm text-gray-600">{activity.item} • {activity.user}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl border border-gray-200 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all text-left flex items-center justify-between">
                                            <span>Add New University Item</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                        <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-left flex items-center justify-between">
                                            <span>View All Student Listings</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
                                        <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all text-left flex items-center justify-between">
                                            <span>Manage Users</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'requests' && (
                            <div className="bg-white rounded-xl border border-gray-200">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900">Pending Approval Requests</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Requester</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {pendingRequests.map((request) => (
                                                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-gray-900">{request.item}</p>
                                                        {request.owner && (
                                                            <p className="text-xs text-gray-500">Owner: {request.owner}</p>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-gray-900">{request.requester}</p>
                                                        <p className="text-xs text-gray-500">{request.email}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${request.type === 'University'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-purple-100 text-purple-700'
                                                            }`}>
                                                            {request.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => handleApproveRequest(request.id)}
                                                                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-all"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button 
                                                                onClick={() => handleRejectRequest(request.id)}
                                                                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'items' && (
                            <div className="bg-white rounded-xl border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">All Platform Items</h3>
                                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
                                        Add New Item
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📷</div>
                                            <div>
                                                <p className="font-medium text-gray-900">DSLR Camera</p>
                                                <p className="text-sm text-gray-600">University Item • Electronics</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Available</span>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">📚</div>
                                            <div>
                                                <p className="font-medium text-gray-900">Calculus Textbook</p>
                                                <p className="text-sm text-gray-600">Student Item • Books • Listed by Sarah M.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Available</span>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">⛺</div>
                                            <div>
                                                <p className="font-medium text-gray-900">Tent (4-person)</p>
                                                <p className="text-sm text-gray-600">University Item • Camping</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">Borrowed</span>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}