'use client'

import React from 'react';

interface TextAreaFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    rows = 5,
    required = false,
    className = '',
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                rows={rows}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-y ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};

export default TextAreaField;