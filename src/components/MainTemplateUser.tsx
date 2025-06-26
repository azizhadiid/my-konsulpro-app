import { ReactNode } from 'react';
import NavbarUser from "@/app/home/components/NavbarUser";

interface MainTemplateUserProps {
    children: ReactNode;
}

const MainTemplateUser = ({ children }: MainTemplateUserProps) => {
    return (
        <main className="min-h-screen bg-white">
            {/* Navbar */}
            <NavbarUser />

            {/* Konten halaman akan dirender di sini */}
            {children}
        </main>
    );
};

export default MainTemplateUser;