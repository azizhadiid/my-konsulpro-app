'use client';

import { MdSearch } from 'react-icons/md';
import { useState, useEffect } from 'react'; // Import useEffect dan useState untuk debounce internal

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
    const [internalValue, setInternalValue] = useState(value);

    // Sinkronkan internalValue dengan prop value saat prop berubah (misal saat reset)
    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        // onChange akan dipanggil oleh useEffect di parent, atau bisa langsung di sini jika debounce di handle di parent
        // Jika debounce di parent, ini hanya perlu update internal state
        onChange(e.target.value); // Langsung kirim perubahan ke parent untuk di-debounce
    };

    return (
        <div className="relative w-full md:max-w-md">
            <input
                type="text"
                placeholder="Cari artikel (judul, kategori, tag)..."
                value={internalValue}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm transition-all duration-200 text-lg"
            />
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-2xl" />
        </div>
    );
}