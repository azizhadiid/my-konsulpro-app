'use client'

import React from 'react';
import Link from 'next/link';

const HistoryCtaSection: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Butuh Konsultasi Baru?</h2>
            <p className="text-blue-100 mb-6">Tim ahli kami siap membantu transformasi digital dan strategi bisnis Anda.</p>
            <Link className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" href="/konsultasi">
                Mulai Konsultasi →
            </Link>
        </div>
    );
};

export default HistoryCtaSection;