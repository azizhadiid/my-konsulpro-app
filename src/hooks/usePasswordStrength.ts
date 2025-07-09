// src/hooks/usePasswordStrength.ts
import { useState, useEffect } from 'react';

interface PasswordStrength {
    strength: number;
    color: string;
    text: string;
}

const calculateStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
};

const getStrengthColor = (strength: number): string => {
    switch (strength) {
        case 0:
        case 1: return 'bg-red-500';
        case 2: return 'bg-orange-500';
        case 3: return 'bg-yellow-500';
        case 4: return 'bg-blue-500';
        case 5: return 'bg-green-500';
        default: return 'bg-gray-300';
    }
};

const getStrengthText = (strength: number): string => {
    switch (strength) {
        case 0:
        case 1: return 'Lemah';
        case 2: return 'Cukup';
        case 3: return 'Baik';
        case 4: return 'Kuat';
        case 5: return 'Sangat Kuat';
        default: return '';
    }
};

export const usePasswordStrength = (password: string): PasswordStrength => {
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    useEffect(() => {
        setPasswordStrength(calculateStrength(password));
    }, [password]);

    return {
        strength: passwordStrength,
        color: getStrengthColor(passwordStrength),
        text: getStrengthText(passwordStrength),
    };
};