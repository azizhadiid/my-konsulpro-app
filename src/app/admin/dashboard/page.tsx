'use client'

import MainTemplateAdmin from "../components/MainTemplateAdmin";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [stats] = useState([
        { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", positive: true },
        { title: "Active Users", value: "2,234", change: "+12.5%", positive: true },
        { title: "Conversion Rate", value: "14.2%", change: "-2.3%", positive: false },
        { title: "Growth Rate", value: "87.3%", change: "+8.2%", positive: true },
    ]);

    const [recentActivity] = useState([
        { title: "New client consultation", time: "2 minutes ago", type: "meeting" },
        { title: "System backup completed", time: "15 minutes ago", type: "system" },
        { title: "Project milestone reached", time: "1 hour ago", type: "project" },
        { title: "Payment received", time: "3 hours ago", type: "payment" },
    ]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    return (
        <MainTemplateAdmin>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-gray-100 dark:border-gray-600">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome back, Admin
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Here's what's happening with your business today.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                                Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainTemplateAdmin>
    );
};

export default DashboardPage;