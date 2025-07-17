'use client'

import React from 'react';

const HistoryHeader: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-4">Riwayat Konsultasi</h1>
                <p className="text-blue-100 text-lg">
                    Pantau progres dan kelola seluruh riwayat konsultasi IT dan bisnis Anda dengan mudah.
                </p>
            </div>
        </div>
    );
};

export default HistoryHeader;