'use client'

import React from 'react';
import { Sparkles, Zap, Shield, Target } from 'lucide-react';

const ConsultationHeader = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-400/5 dark:to-indigo-400/5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Konsultasi IT Terpercaya
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Wujudkan Visi
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            Teknologi Anda
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Ceritakan tantangan bisnis Anda. Tim ahli kami siap memberikan solusi teknologi terbaik untuk mengakselerasi pertumbuhan perusahaan Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Respons Cepat
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Tim ahli kami siap memberikan solusi dalam 24 jam
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Terpercaya
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Berpengalaman menangani 500+ proyek IT berhasil
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Hasil Terukur
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Solusi yang dapat diimplementasi dan ROI yang jelas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationHeader;