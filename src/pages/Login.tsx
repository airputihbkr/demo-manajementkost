import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion } from 'framer-motion';

// Simplistic Aurora Background Implementation if missing
const AuroraBackgroundSimple = ({ children }: { children: React.ReactNode }) => (
    <AuroraBackground>
        {children}
    </AuroraBackground>
);

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState('demo');
    const [password, setPassword] = useState('demo123'); // Pre-filled credentials
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!login(username, password)) {
            setError('Username atau Password salah!');
        }
    };

    return (
        <AuroraBackgroundSimple>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="w-full max-w-md bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                            Admin Portal
                        </h1>
                        <p className="text-neutral-400 text-sm mt-2">Masuk untuk mengelola kost Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg font-bold text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all active:scale-95"
                        >
                            Masuk Dashboard
                        </button>
                    </form>
                </div>
            </motion.div>
        </AuroraBackgroundSimple>
    );
}
