'use client'

// src/components/ui/PasswordInput.tsx
import React, { useState } from 'react';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import InputField from './InputField';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    value: string;
    showStrength?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, value, showStrength = false, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { strength, color, text } = usePasswordStrength(value);

    return (
        <div className="space-y-2">
            <div className="relative">
                <InputField
                    label={label}
                    id={id}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    {...props}
                />
            </div>

            {showStrength && value && (
                <div className="mt-2">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-white/20 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${color}`}
                                style={{ width: `${(strength / 5) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-white/70">
                            {text}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasswordInput;