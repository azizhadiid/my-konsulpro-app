import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { AuthProvider } from "@/context/AuthContext";
import ToastNotification from "@/components/shared/ToastNotification";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: "KonsulPro",
  description: "Konsultasi IT Mantul!",
  icons: { icon: '/logo.svg' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <AuthProvider>
          <Script
            src={`https://app.${process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === 'true' ? '' : 'sandbox.'}midtrans.com/snap/snap.js`}
            data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
            strategy="beforeInteractive"
          />
          {children}
          <ToastNotification />
        </AuthProvider>
      </body>
    </html>
  );
}
