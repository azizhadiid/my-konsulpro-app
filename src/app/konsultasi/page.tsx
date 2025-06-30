"use client";

import axios from "axios";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        snap: any;
    }
}

const KonsultasiPage = () => {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:8000/api/konsultasi",
                { judul, deskripsi },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const snapToken = res.data.snap_token;

            // Midtrans popup
            window.snap.pay(snapToken, {
                onSuccess: () => alert("Pembayaran berhasil!"),
                onPending: () => alert("Menunggu verifikasi admin..."),
                onError: () => alert("Pembayaran gagal."),
            });
        } catch (err: any) {
            alert("Gagal mengajukan konsultasi");
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/profile", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (!res.data.bidang_keahlian) {
                alert("Silakan lengkapi profil kamu terlebih dahulu!");
                window.location.href = "/akun"; // redirect ke halaman profil
            }
        });
    }, []);


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul Konsultasi"
                required
                className="w-full p-2 border rounded"
            />
            <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsikan permasalahan kamu"
                required
                className="w-full p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Ajukan Konsultasi
            </button>
        </form>
    );
};

export default KonsultasiPage;
