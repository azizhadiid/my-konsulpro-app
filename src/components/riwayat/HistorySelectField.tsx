'use client'

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface HistorySelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const HistorySelectField: React.FC<HistorySelectFieldProps> = ({
    options,
    value,
    onChange,
    className,
    ...props
}) => {
    const baseClasses = "appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
    const combinedClasses = `${baseClasses} ${className || ''}`.trim();

    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                className={combinedClasses}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
    );
};

export default HistorySelectField;