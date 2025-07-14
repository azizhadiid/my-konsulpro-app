'use client'

// src/components/ui/AccountActionButton.tsx
import React from 'react';

interface AccountActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary'; // primary (edit/simpan) atau secondary (batal)
}

const AccountActionButton: React.FC<AccountActionButtonProps> = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    const baseStyles = "w-full py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg";

    const variantStyles = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 hover:shadow-xl",
        secondary: "bg-slate-400 text-white hover:bg-slate-500",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`.trim();

    return (
        <button
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default AccountActionButton;
