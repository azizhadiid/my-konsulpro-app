'use client'

import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Pastikan Anda menginstal @heroicons/react

const ContactInfoCard: React.FC = () => {
    return (
        <div className="bg-blue-700 text-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl font-bold mb-6">Informasi Kontak</h2>
                <p className="text-blue-100 leading-relaxed mb-8">
                    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis.
                    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis.
                </p>

                <div className="space-y-6">
                    {/* Location */}
                    <div className="flex items-start">
                        <MapPinIcon className="h-7 w-7 text-blue-300 mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Lokasi Kami</h3>
                            <p className="text-blue-100">A108 Adam Street</p>
                            <p className="text-blue-100">New York, NY 535022</p>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-start">
                        <PhoneIcon className="h-7 w-7 text-blue-300 mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Nomor Telepon</h3>
                            <p className="text-blue-100">+1 5589 55488 55</p>
                            <p className="text-blue-100">+1 6678 254445 41</p>
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex items-start">
                        <EnvelopeIcon className="h-7 w-7 text-blue-300 mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Alamat Email</h3>
                            <p className="text-blue-100">info@example.com</p>
                            <p className="text-blue-100">contact@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoCard;