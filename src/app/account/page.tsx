'use client';
import MainTemplateUser from '@/components/MainTemplateUser';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AccountPage = () => {
    const [profile, setProfile] = useState<any>({});
    const [formData, setFormData] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
        }
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8000/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                setProfile(res.data);
                setFormData(res.data);
            });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) data.append(key, value);
        });
        if (selectedFile) {
            data.append('foto', selectedFile);
        }

        await axios.post('http://localhost:8000/api/profile', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => alert("Profil berhasil diperbarui!"));
    };


    return (
        <MainTemplateUser>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Akun Saya</h1>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" placeholder="Nama Lengkap" className="input" value={formData.nama_lengkap || ''} onChange={e => setFormData({ ...formData, nama_lengkap: e.target.value })} />
                    <input type="date" placeholder="Tanggal Lahir" className="input" value={formData.tanggal_lahir || ''} onChange={e => setFormData({ ...formData, tanggal_lahir: e.target.value })} />
                    <input type="text" placeholder="Pekerjaan" className="input" value={formData.pekerjaan || ''} onChange={e => setFormData({ ...formData, pekerjaan: e.target.value })} />
                    <input type="text" placeholder="Keahlian" className="input" value={formData.bidang_keahlian || ''} onChange={e => setFormData({ ...formData, bidang_keahlian: e.target.value })} />
                    <input type="text" placeholder="No HP" className="input" value={formData.nohp || ''} onChange={e => setFormData({ ...formData, nohp: e.target.value })} />
                    <input type="text" placeholder="Alamat" className="input" value={formData.alamat || ''} onChange={e => setFormData({ ...formData, alamat: e.target.value })} />
                    <input type="text" placeholder="Kantor" className="input" value={formData.kantor || ''} onChange={e => setFormData({ ...formData, kantor: e.target.value })} />
                    <textarea placeholder="Tentang Saya" className="input" value={formData.about || ''} onChange={e => setFormData({ ...formData, about: e.target.value })} />
                    <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">Simpan</button>
                </form>
            </div>
        </MainTemplateUser>
    );
};

export default AccountPage;
