'use client'

import React from 'react';

interface SubmitButtonProps {
    children: React.ReactNode;
    loading: boolean;
    onClick: () => void;
    className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    children,
    loading,
    onClick,
    className = '',
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700 transition-colors'}
        ${className}`}
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default SubmitButton;