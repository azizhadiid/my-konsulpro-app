'use client'

import React from 'react';
import { Calculator } from 'lucide-react';

interface PriceSummaryCardProps {
    duration: number;
    totalPrice: number;
    pricePerMonth: number;
}

const PriceSummaryCard: React.FC<PriceSummaryCardProps> = ({ duration, totalPrice, pricePerMonth }) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl"></div>
            <div className="relative p-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between flex-col sm:flex-row text-center sm:text-left">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Investasi Konsultasi
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Rp {pricePerMonth.toLocaleString('id-ID')} per bulan &times; {duration} bulan
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            Rp {totalPrice.toLocaleString('id-ID')}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Termasuk follow-up support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceSummaryCard;