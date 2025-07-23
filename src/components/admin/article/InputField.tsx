'use client'

import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type: React.HTMLInputTypeAttribute;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    className = '',
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
        </div>
    );
};

export default InputField;