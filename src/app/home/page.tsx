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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

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

            {/* Services Deep Dive Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span>Layanan Terbaik</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Solusi Komprehensif untuk Setiap Kebutuhan
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Dari strategi hingga implementasi, kami menyediakan layanan end-to-end untuk transformasi digital perusahaan Anda
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Service Card 1 */}
                        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Digital Strategy & Planning</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Roadmap strategis untuk transformasi digital yang disesuaikan dengan visi dan budget perusahaan Anda.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Digital Assessment & Audit
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Technology Roadmap
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        ROI Analysis & Forecasting
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service Card 2 */}
                        <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-green-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">System Integration & Automation</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Integrasi sistem yang seamless untuk meningkatkan efisiensi operasional dan produktivitas tim.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        API Development & Integration
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Workflow Automation
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Data Migration & Sync
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Service Card 3 */}
                        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-purple-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Analytics & AI</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Manfaatkan kekuatan data dan AI untuk insight bisnis yang actionable dan competitive advantage.
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Business Intelligence Dashboard
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Predictive Analytics
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Machine Learning Solutions
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Success Stories / Case Studies */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span>Success Stories</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Kesuksesan Klien adalah Prioritas Kami
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Lihat bagaimana kami membantu berbagai perusahaan mencapai target bisnis mereka
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Case Study 1 */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Manufacturing
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="text-2xl font-bold">320%</div>
                                    <div className="text-sm opacity-90">ROI Increase</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">PT Industri Maju</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Transformasi digital lengkap dari sistem manual ke otomasi penuh dengan IoT integration.
                                </p>
                                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                    <span>Baca Selengkapnya</span>
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Case Study 2 */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Retail
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="text-2xl font-bold">85%</div>
                                    <div className="text-sm opacity-90">Cost Reduction</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Retail Chain ABC</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Implementasi sistem POS terintegrasi dengan inventory management dan analytics real-time.
                                </p>
                                <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                                    <span>Baca Selengkapnya</span>
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Case Study 3 */}
                        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden">
                            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Healthcare
                                </div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="text-2xl font-bold">60%</div>
                                    <div className="text-sm opacity-90">Faster Processing</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Klinik Sehat Plus</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                    Digitalisasi rekam medis dengan AI-powered diagnosis assistance dan telemedicine platform.
                                </p>
                                <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                    <span>Baca Selengkapnya</span>
                                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25">
                            Lihat Semua Case Studies
                        </button>
                    </div>
                </div>
            </section>

            {/* Process/How We Work Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span>Metodologi Kami</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Proses Kerja yang Terbukti Efektif
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Metodologi terstruktur dengan pendekatan agile untuk memastikan hasil optimal dan tepat waktu
                        </p>
                    </div>

                    <div className="relative">
                        {/* Process Steps */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Step 1 */}
                            <div className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                                        <span className="text-2xl font-bold text-white">1</span>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Discovery & Analysis</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        Deep dive assessment untuk memahami kebutuhan, tantangan, dan goals bisnis Anda
                                    </p>
                                </div>
                                {/* Connector line */}
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-green-600 transform -translate-y-1/2"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                                        <span className="text-2xl font-bold text-white">2</span>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strategy & Planning</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        Penyusunan roadmap strategis dengan timeline, budget, dan milestone yang jelas
                                    </p>
                                </div>
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-600 to-orange-600 transform -translate-y-1/2"></div>
                            </div>

                            {/* Step 3 */}
                            <div className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                                        <span className="text-2xl font-bold text-white">3</span>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Implementation</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        Eksekusi solusi dengan monitoring progress real-time dan quality assurance
                                    </p>
                                </div>
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-orange-600 to-purple-600 transform -translate-y-1/2"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative group">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                                        <span className="text-2xl font-bold text-white">4</span>
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Support & Optimize</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                        Maintenance berkelanjutan dengan optimization dan scaling sesuai pertumbuhan bisnis
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline indicator for mobile */}
                        <div className="lg:hidden flex justify-center mt-8">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Process Benefits */}
                    <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">2-4 Minggu</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Timeline Rata-rata</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">99.2%</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Success Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Support Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team/Experts Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <span>Tim Ahli</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Bertemu dengan Expert Kami
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Tim konsultan bersertifikat internasional dengan pengalaman puluhan tahun di berbagai industri
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Team Member 1 */}
                        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                                    JD
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">John Doe</h3>
                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">Senior IT Consultant</p>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        AWS Certified Solutions Architect
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Microsoft Azure Expert
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        15+ Years Experience
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                                    SA
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Sarah Ahmad</h3>
                                <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-3">Data Analytics Lead</p>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        Google Cloud Professional
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Tableau Certified Expert
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        12+ Years Experience
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                                    MR
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Michael Rodriguez</h3>
                                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium mb-3">Cybersecurity Expert</p>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        CISSP Certified
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        Ethical Hacker (CEH)
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        18+ Years Experience
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 4 */}
                        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                                    AL
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Anita Liu</h3>
                                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-3">Business Strategy Lead</p>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                        MBA Strategy & Innovation
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                        PMP Certified
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                        14+ Years Experience
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Stats */}
                    <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Expert Consultants</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Certifications</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Years Average Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">Expert Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span>Testimoni Klien</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                            Apa Kata Klien Kami
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Kepuasan klien adalah prioritas utama kami. Dengarkan pengalaman mereka bersama KonsulPro
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                            <div className="mb-6">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    "KonsulPro berhasil mentransformasi seluruh infrastruktur IT kami. ROI yang didapat melebihi ekspektasi dan tim mereka sangat profesional dalam setiap tahapan project."
                                </blockquote>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    BS
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Budi Santoso</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">CEO, PT Teknologi Maju</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-green-100 dark:border-gray-700 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                            <div className="mb-6">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    "Implementasi sistem analytics mereka membantu kami mengoptimalkan operations hingga 40%. Support team yang responsif dan solusi yang scalable."
                                </blockquote>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    SR
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Sari Rahma</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Operations Director, Retail Chain ABC</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-purple-100 dark:border-gray-700 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                            <div className="mb-6">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    "Partnership dengan KonsulPro mengubah cara kami menjalankan bisnis. Solusi cybersecurity mereka memberikan peace of mind dan competitive advantage."
                                </blockquote>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    DW
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Dr. William Chen</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Medical Director, Klinik Sehat Plus</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Overall Rating */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-8 py-4 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                            <div className="flex text-yellow-400 text-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9/5</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">dari 500+ reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </MainTemplateUser>
    );
}