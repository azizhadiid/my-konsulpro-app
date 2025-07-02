'use client';

import React from 'react';
import Link from 'next/link';
import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Twitter,
    Instagram,
    ArrowRight,
    Zap,
    Shield,
    Users,
    TrendingUp
} from 'lucide-react';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerSections: FooterSection[] = [
        {
            title: 'Layanan',
            links: [
                { label: 'Konsultasi IT', href: '/layanan/konsultasi-it' },
                { label: 'Strategi Bisnis', href: '/layanan/strategi-bisnis' },
                { label: 'Digital Transformation', href: '/layanan/digital-transformation' },
                { label: 'Cloud Solutions', href: '/layanan/cloud-solutions' },
                { label: 'Cybersecurity', href: '/layanan/cybersecurity' }
            ]
        },
        {
            title: 'Perusahaan',
            links: [
                { label: 'Tentang Kami', href: '/tentang' },
                { label: 'Tim Ahli', href: '/tim' },
                { label: 'Karir', href: '/karir' },
                { label: 'Blog', href: '/blog' },
                { label: 'Case Studies', href: '/case-studies' }
            ]
        },
        {
            title: 'Dukungan',
            links: [
                { label: 'Pusat Bantuan', href: '/bantuan' },
                { label: 'Dokumentasi', href: '/dokumentasi' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Kontak Support', href: '/support' },
                { label: 'Live Chat', href: '/chat' }
            ]
        }
    ];

    const socialLinks = [
        { icon: Linkedin, href: 'https://linkedin.com/company/yourcompany', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/yourcompany', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com/yourcompany', label: 'Instagram' }
    ];

    const contactInfo = [
        { icon: Mail, text: 'hello@yourcompany.com', href: 'mailto:hello@yourcompany.com' },
        { icon: Phone, text: '+62 21 1234 5678', href: 'tel:+622112345678' },
        { icon: MapPin, text: 'Jakarta, Indonesia', href: '#' }
    ];

    const features = [
        { icon: Zap, text: 'Solusi Cepat' },
        { icon: Shield, text: 'Keamanan Terjamin' },
        { icon: Users, text: 'Tim Berpengalaman' },
        { icon: TrendingUp, text: 'ROI Optimal' }
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="relative">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-4">
                            <div className="mb-6">
                                <Link href="/" className="inline-flex items-center space-x-2 group">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        KonsulPro
                                    </span>
                                </Link>
                            </div>

                            <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
                                Partner terpercaya untuk transformasi digital dan konsultasi bisnis.
                                Wujudkan visi teknologi perusahaan Anda bersama tim ahli kami.
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-sm text-slate-400">
                                        <feature.icon className="w-4 h-4 text-blue-400" />
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/konsultasi"
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                            >
                                <span>Konsultasi Gratis</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Links Sections */}
                        <div className="lg:col-span-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {footerSections.map((section, index) => (
                                    <div key={index}>
                                        <h3 className="text-white font-semibold mb-4 text-lg">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {section.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-semibold mb-4 text-lg">
                                Hubungi Kami
                            </h3>
                            <div className="space-y-4 mb-6">
                                {contactInfo.map((contact, index) => (
                                    <Link
                                        key={index}
                                        href={contact.href}
                                        className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors duration-200 group"
                                    >
                                        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                                            <contact.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm">{contact.text}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-3">
                                {socialLinks.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>



                    {/* Bottom Section */}
                    <div className="border-t border-slate-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-400">
                                <p>&copy; {currentYear} TechConsult. All rights reserved.</p>
                                <div className="flex space-x-6">
                                    <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                                        Kebijakan Privasi
                                    </Link>
                                    <Link href="/terms" className="hover:text-white transition-colors duration-200">
                                        Syarat & Ketentuan
                                    </Link>
                                    <Link href="/cookies" className="hover:text-white transition-colors duration-200">
                                        Kebijakan Cookie
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                                <span>Made with</span>
                                <span className="text-red-400 animate-pulse">❤️</span>
                                <span>in Indonesia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;