'use client';

type LoadingProps = {
    perPage: number; // Untuk menentukan berapa banyak skeleton yang ditampilkan
}

export default function Loading({ perPage }: LoadingProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 animate-pulse">
            {Array.from({ length: perPage }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 h-[420px] sm:h-[450px]">
                    <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-24 mb-2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mt-4"></div>
                </div>
            ))}
        </div>
    );
}