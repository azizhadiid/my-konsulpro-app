'use client'

import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

interface ImageUploadFieldProps {
    id: string;
    label: string;
    onFileChange: (file: File | null) => void;
    previewUrl: string | null;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    id,
    label,
    onFileChange,
    previewUrl,
    required = false,
    className = '',
    disabled = false,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        onFileChange(file || null);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-500 transition-colors ${className}`}>
                <label htmlFor={id} className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <div className="space-y-1 text-center">
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                width={128} // Sesuaikan ukuran sesuai kebutuhan
                                height={128} // Sesuaikan ukuran sesuai kebutuhan
                                className="mx-auto h-32 w-auto object-cover rounded-lg"
                                unoptimized // Gunakan unoptimized jika preview adalah data URL
                            />
                        ) : (
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <p className="pl-1">Drag and drop atau</p>
                            <span className="font-semibold text-blue-600 hover:text-blue-500 ml-1">Unggah file</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF hingga 10MB</p>
                    </div>
                    <input
                        id={id}
                        name={id}
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/gif,image/jpg"
                        required={required}
                        disabled={disabled}
                    />
                </label>
            </div>
        </div>
    );
};

export default ImageUploadField;