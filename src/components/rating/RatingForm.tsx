'use client';

import React, { useState, useEffect } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import StarRatingInput from './StarRatingInput';
import { authService } from '@/lib/api';
import { SubmitRatingPayload } from '@/types/rating';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { toast } from 'react-toastify'; // Menggunakan react-toastify

interface RatingFormProps {
    onRatingSubmitSuccess: () => void; // Callback untuk refresh data setelah submit
    services: string[]; // Daftar layanan yang bisa dipilih
}

const RatingForm: React.FC<RatingFormProps> = ({ onRatingSubmitSuccess, services }) => {
    const { user } = useAuth(); // Ambil user dari AuthContext
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false); // Untuk animasi sukses

    // Set nama pengguna otomatis dari AuthContext
    const userName = user?.name || ''; // Jika user tidak ada, nama kosong
    const isNameInputDisabled = !!user; // Disable input nama jika user sudah login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedRating === 0 || !review.trim() || !selectedService || !userName.trim()) {
            toast.error('Harap lengkapi semua field!');
            return;
        }

        setIsSubmitting(true);
        toast.dismiss(); // Tutup toast yang mungkin masih terbuka

        const payload: SubmitRatingPayload = {
            service_name: selectedService,
            rating: selectedRating,
            review: review.trim(),
        };

        try {
            await authService.submitRating(payload);
            setSubmittedSuccessfully(true); // Aktifkan animasi sukses
            toast.success('Review Anda berhasil dikirim!');

            // Reset form setelah sukses
            setSelectedRating(0);
            setReview('');
            setSelectedService('');

            // Panggil callback untuk refresh data di parent
            onRatingSubmitSuccess();

            // Matikan animasi sukses setelah beberapa waktu
            setTimeout(() => {
                setSubmittedSuccessfully(false);
            }, 3000);

        } catch (error: any) {
            console.error('Error submitting rating:', error.response?.data || error.message);
            if (error.response?.status === 409) { // Conflict: User already reviewed
                toast.info(error.response.data.message || 'Anda sudah memberikan review untuk layanan ini.');
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Gagal mengirim review. Silakan coba lagi.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Berikan Rating</h2>
                    <p className="text-gray-300">Bagikan pengalaman Anda dengan layanan kami</p>
                </div>
            </div>

            {submittedSuccessfully ? (
                <div className="text-center space-y-4 py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-white">Terima Kasih!</h3>
                    <p className="text-gray-300">Review Anda telah berhasil dikirim</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-white font-medium mb-3">Nama Anda</label>
                        <input
                            id="name"
                            type="text"
                            value={userName} // Menggunakan userName dari AuthContext
                            readOnly={isNameInputDisabled} // Readonly jika user login
                            className={`w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isNameInputDisabled ? 'cursor-not-allowed opacity-70' : ''}`}
                            placeholder="Nama Anda akan terisi otomatis"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="service" className="block text-white font-medium mb-3">Layanan yang Anda gunakan</label>
                        <select
                            id="service"
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                            required
                        >
                            <option value="" className="bg-slate-800">Pilih layanan</option>
                            {services.map((service) => (
                                <option key={service} value={service} className="bg-slate-800">{service}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-white font-medium mb-3">
                            Rating Anda ({selectedRating}/5)
                        </label>
                        <StarRatingInput
                            selectedRating={selectedRating}
                            onSelectRating={setSelectedRating}
                            hoverRating={hoverRating}
                            onHoverEnter={setHoverRating}
                            onHoverLeave={() => setHoverRating(0)}
                            size="w-8 h-8"
                        />
                    </div>

                    <div>
                        <label htmlFor="review" className="block text-white font-medium mb-3">Review Anda</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Ceritakan pengalaman Anda menggunakan layanan kami..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || selectedRating === 0 || !review.trim() || !selectedService || !userName.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Mengirim...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Kirim Review</span>
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
};

export default RatingForm;