'use client'

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MainTemplateUser from "@/components/MainTemplateUser";
import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactForm from '@/components/contact/ContactForm';

const KontakPage = () => {
    // Logic untuk redirect jika tidak ada token, tetap di sini atau bisa dipindahkan ke Layout/Middleware
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    return (
        <MainTemplateUser>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-24">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Kontak Kami
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau butuh konsultasi.
                        </p>
                    </div>

                    {/* Contact Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Info Card */}
                        <ContactInfoCard />

                        {/* Contact Form */}
                        <ContactForm />
                    </div>
                </div>
            </div>
        </MainTemplateUser>
    );
};

export default KontakPage;