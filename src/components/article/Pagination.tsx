'use client';

type Props = {
    page: number;
    lastPage: number;
    setPage: (val: number) => void;
    totalItems: number; // Tambahkan totalItems untuk info tampilan
    perPage: number; // Tambahkan perPage untuk info tampilan
};

export default function Pagination({ page, lastPage, setPage, totalItems, perPage }: Props) {
    // Fungsi untuk menghasilkan angka halaman yang akan ditampilkan (misal: [1, 2, 3, ..., lastPage])
    const getPageNumbers = () => {
        const pages = [];
        const maxPageButtons = 5; // Maksimal 5 tombol halaman yang terlihat sekaligus
        let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(lastPage, startPage + maxPageButtons - 1);

        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < lastPage) {
            if (endPage < lastPage - 1) pages.push('...');
            pages.push(lastPage);
        }

        return pages;
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 space-y-4 md:space-y-0">
            <div className="text-base text-gray-700 dark:text-gray-300">
                Menampilkan {totalItems === 0 ? 0 : (page - 1) * perPage + 1} sampai {Math.min(page * perPage, totalItems)} dari {totalItems} artikel
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500
                                hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {getPageNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                        <span key={index} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => setPage(pageNum as number)}
                            aria-current={page === pageNum ? 'page' : undefined}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${page === pageNum
                                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                                } focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                transition-colors`}
                        >
                            {pageNum}
                        </button>
                    )
                ))}

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === lastPage}
                    className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500
                                hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600
                                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </nav>
        </div>
    );
}