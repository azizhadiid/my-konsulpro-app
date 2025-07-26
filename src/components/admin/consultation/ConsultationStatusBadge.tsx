'use client'

import React from 'react';
import { CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react';
import { ConsultationItem } from '@/types/consultation'; // Import tipe

interface ConsultationStatusBadgeProps {
    status: ConsultationItem['status'];
}

const ConsultationStatusBadge: React.FC<ConsultationStatusBadgeProps> = ({ status }) => {
    const statusConfig = {
        completed: {
            bg: "bg-green-100",
            text: "text-green-800",
            label: "Selesai",
            icon: <CheckCircle className="w-4 h-4 mr-1" />,
        },
        pending: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            label: "Menunggu",
            icon: <Clock className="w-4 h-4 mr-1" />,
        },
        paid: {
            bg: "bg-blue-100",
            text: "text-blue-800",
            label: "Dibayar",
            icon: <DollarSign className="w-4 h-4 mr-1" />,
        },
        cancelled: {
            bg: "bg-red-100",
            text: "text-red-800",
            label: "Dibatalkan",
            icon: <XCircle className="w-4 h-4 mr-1" />,
        },
    };

    const config = statusConfig[status] || statusConfig.pending; // Default ke pending
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
            {config.icon}
            {config.label}
        </span>
    );
};

export default ConsultationStatusBadge;