'use client'

import MainTemplateUser from "@/components/MainTemplateUser";
import Navbar from "@/components/Navabr";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { value: "200+", label: "Klien Terlayani", icon: "👥" },
        { value: "98%", label: "Tingkat Kepuasan", icon: "⭐" },
        { value: "24/7", label: "Support Ready", icon: "🚀" },
        { value: "15+", label: "Tahun Pengalaman", icon: "💼" }
    ];

    const features = [
        {
            title: "Konsultasi IT Strategy",
            description: "Strategi teknologi yang tepat untuk transformasi digital bisnis Anda",
            icon: "🔧"
        },
        {
            title: "Business Process Optimization",
            description: "Optimalisasi proses bisnis untuk efisiensi dan produktivitas maksimal",
            icon: "📊"
        },
        {
            title: "Digital Transformation",
            description: "Panduan lengkap untuk mengadopsi teknologi digital terdepan",
            icon: "🚀"
        }
    ];

    return (
        <MainTemplateUser>

            {/* Hero Section */}
            <section className="relative pt-20 lg:pt-28 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-violet-400/10 to-purple-400/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Hero Content */}
                        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                <span>Solusi IT & Bisnis Terdepan</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                    Transformasi Digital
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Untuk Bisnis Anda
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-xl">
                                Konsultasi profesional IT & strategi bisnis yang membantu perusahaan Anda mencapai pertumbuhan exponential dengan teknologi terdepan.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                                    <span className="flex items-center space-x-2">
                                        <span>Mulai Konsultasi</span>
                                        <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                                <button className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/50">
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Demo Gratis</span>
                                    </span>
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`text-center transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                    >
                                        <div className="text-2xl mb-1">{stat.icon}</div>
                                        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="relative">
                                {/* Main Image Container */}
                                <div className="relative bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-2xl shadow-blue-900/10">
                                    <Image
                                        src="/assets/img/education/showcase-6.webp"
                                        alt="IT Consultation"
                                        width={600}
                                        height={500}
                                        className="rounded-2xl w-full shadow-lg"
                                    />

                                    {/* Floating Elements */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-500/25 animate-float">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-semibold">Certified Experts</span>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/25 animate-float-delayed">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="font-semibold">Fast Results</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Decorative Elements */}
                                <div className="absolute -z-10 top-8 right-8 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
                                <div className="absolute -z-10 bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom CSS for animations */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                    .animate-float-delayed {
                        animation: float 3s ease-in-out infinite;
                        animation-delay: 1.5s;
                    }
                `}</style>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Layanan Unggulan Kami
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Solusi komprehensif untuk kebutuhan transformasi digital dan optimasi bisnis Anda
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover effect background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* About Image */}
                        <div className="relative">
                            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl">
                                <Image
                                    src="/assets/img/education/events-1.webp"
                                    alt="Tentang KonsulPro"
                                    width={600}
                                    height={400}
                                    className="rounded-2xl w-full shadow-lg"
                                />

                                {/* Stats overlay */}
                                <div className="absolute top-8 right-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">15+</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -z-10 -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
                            <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
                        </div>

                        {/* About Content */}
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <span>Tentang Kami</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Mitra Terpercaya untuk
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Transformasi Digital
                                </span>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                KonsulPro adalah platform konsultasi IT & bisnis terdepan yang telah membantu ratusan perusahaan
                                mencapai pertumbuhan eksponensial melalui strategi teknologi yang tepat dan inovasi berkelanjutan.
                            </p>

                            {/* Features list */}
                            <div className="space-y-4 mb-8">
                                {[
                                    "Konsultan IT bersertifikat internasional",
                                    "Strategi bisnis berbasis data & analytics",
                                    "Support 24/7 dengan response time <2 jam",
                                    "ROI tracking dan performance monitoring"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25">
                                    Pelajari Lebih Lanjut
                                </button>
                                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                                    Download Company Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainTemplateUser>
    );
}