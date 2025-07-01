'use client'

import { ReactNode } from 'react';
import NavbarUser from "@/app/home/components/NavbarUser";
import Footer from './Footer';

interface MainTemplateUserProps {
    children: ReactNode;
}

const MainTemplateUser = ({ children }: MainTemplateUserProps) => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Navbar */}
            <NavbarUser />

            {/* Konten halaman akan dirender di sini */}
            {children}

            {/* Footer */}
            <Footer />
        </main>
    );
};

export default MainTemplateUser;