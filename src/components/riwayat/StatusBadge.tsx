'use client'

import React from 'react';
import { CheckCircle, Clock, DollarSign, XCircle } from 'lucide-react'; // Import Lucide Icons

interface StatusBadgeProps {
    status: 'completed' | 'pending' | 'paid' | 'cancelled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig = {
        completed: {
            bg: "bg-green-100",
            text: "text-green-800",
            label: "Selesai",
            Icon: CheckCircle
        },
        pending: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            label: "Menunggu",
            Icon: Clock
        },
        paid: {
            bg: "bg-blue-100",
            text: "text-blue-800",
            label: "Dibayar",
            Icon: DollarSign
        },
        cancelled: {
            bg: "bg-red-100",
            text: "text-red-800",
            label: "Dibatalkan",
            Icon: XCircle
        }
    };

    const config = statusConfig[status] || statusConfig.pending; // Default ke pending
    const IconComponent = config.Icon;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
            <IconComponent className="w-4 h-4 mr-1" /> {/* Gunakan IconComponent */}
            {config.label}
        </span>
    );
};

export default StatusBadge;