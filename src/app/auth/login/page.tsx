import Link from "next/link";

const Login = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <form
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Masuk KonsulPro
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-3 focus:outline-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition"
                >
                    Daftar
                </button>



                <p className="text-sm text-center text-gray-500 mt-6">
                    Belum punya akun?{' '}
                    <Link
                        href="/auth/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Daftar di sini
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default Login;