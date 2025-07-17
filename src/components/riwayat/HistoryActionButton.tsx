'use client'

import React from 'react';

interface HistoryActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'whatsapp';
}

const HistoryActionButton: React.FC<HistoryActionButtonProps> = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const baseClasses = "flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium";

    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
        whatsapp: "bg-green-600 hover:bg-green-700 text-white",
    };

    const combinedClasses = `${baseClasses} ${variantStyles[variant]} ${className || ''}`.trim();

    return (
        <button
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
};

export default HistoryActionButton;
