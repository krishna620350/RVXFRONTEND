import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// WARNING: This is not production-grade security. For real security, use httpOnly cookies and server-side session management.
function generateSessionToken() {
    return (
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2)
    );
}

function setCookie(name: string, value: string, minutes = 30) {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (email.trim() === "admin@rvx.com" && password === "1234") {
            // Use a cookie for the session token, expires in 30 minutes
            localStorage.setItem("role", "admin");
            setCookie("token", generateSessionToken(), 30);
            setError("");
            navigate("/admin");
        } else if (email.trim() === "user@rvx.com" && password === "1234") {
            // Use a cookie for the session token, expires in 30 minutes
            setCookie("token", generateSessionToken(), 30);
            setError("");
            navigate("/layout");
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="bg-gray-950 flex justify-center items-center h-screen">
            <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-6">Sign in</h2>
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-white mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-400 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="my-4 w-full flex items-center">
                    <div className="flex-grow h-px bg-gray-600" />
                    <span className="mx-2 text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-600" />
                </div>
                <button
                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-2 rounded hover:bg-gray-200 transition-colors mb-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/><path fill="#FBBC05" d="M24 44c5.1 0 9.8-1.7 13.4-4.7l-6.2-5.1C29.2 36.1 26.7 37 24 37c-6.1 0-10.7-2.9-13.2-7.1l-7 5.4C6.7 41.1 14.7 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-4.6 0-8.3-3.7-8.3-8.3s3.7-8.3 8.3-8.3c2.1 0 4 .8 5.5 2.1l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/></g></svg>
                    Login with Google
                </button>
                <p className="text-gray-300 mt-2">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;