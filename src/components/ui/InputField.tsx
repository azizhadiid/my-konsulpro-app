'use client'

// src/components/ui/InputField.tsx
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, icon, ...props }) => {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-white/90 text-sm font-medium block">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    {...props}
                />
                {icon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputField;