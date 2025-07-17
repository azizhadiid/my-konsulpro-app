'use client'

import React from 'react';
import { Search } from 'lucide-react';

interface HistoryInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HistoryInputField: React.FC<HistoryInputFieldProps> = ({
    placeholder = "Cari...",
    value,
    onChange,
    className,
    ...props
}) => {
    const baseClasses = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    const combinedClasses = `${baseClasses} ${className || ''}`.trim();

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={combinedClasses}
                {...props}
            />
        </div>
    );
};

export default HistoryInputField;