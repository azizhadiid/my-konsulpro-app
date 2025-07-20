'use cleint'

import React from 'react';
import { CheckCircle, Building2 } from 'lucide-react';

interface Category {
    value: string;
    label: string;
    icon: React.ReactNode;
    description: string;
}

interface CategorySelectionProps {
    categories: Category[];
    selectedCategory: string;
    onSelect: (value: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Bidang Konsultasi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Pilih area expertise yang paling sesuai
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.value}
                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedCategory === category.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-600 bg-white/30 dark:bg-gray-700/30 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                        onClick={() => onSelect(category.value)}
                    >
                        <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedCategory === category.value
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                {category.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    {category.label}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {category.description}
                                </p>
                            </div>
                            {selectedCategory === category.value && (
                                <CheckCircle className="w-6 h-6 text-blue-500" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;