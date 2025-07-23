'use client'

import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    value,
    onChange,
    options,
    required = false,
    className = '',
    disabled = false,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
            >
                <option value="">Pilih {label.toLowerCase()}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;