// src/components/shared/ToastNotification.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification: React.FC = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
            toastClassName="backdrop-blur-xl bg-black/80 border border-white/20"
        />
    );
};

export default ToastNotification;