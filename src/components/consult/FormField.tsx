'use client'

import React from 'react';

interface FormFieldProps {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode; // Ini akan menjadi input atau textarea
}

const FormField: React.FC<FormFieldProps> = ({ id, label, description, icon, children }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default FormField;