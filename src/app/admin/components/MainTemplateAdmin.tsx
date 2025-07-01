'use client'

import { ReactNode, useState, useEffect } from 'react';
import SideBar from "./SideBar";
import Header from './Header';

interface MainTemplateAdminProps {
    children: ReactNode;
}

const MainTemplateAdmin = ({ children }: MainTemplateAdminProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <SideBar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main content */}
            <div className="lg:ml-72 transition-all duration-300">
                {/* Top navigation */}
                <Header
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainTemplateAdmin;