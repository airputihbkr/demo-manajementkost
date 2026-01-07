import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/aurora-background';
import { db } from '../lib/db';
import type { Room } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Button } from '../components/ui/moving-border';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Phone, Info } from 'lucide-react';

export default function Home() {
    const rooms = useLiveQuery(() => db.rooms.where('status').equals('tersedia').toArray());
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [rentDuration, setRentDuration] = useState(1);



    const handleBooking = (room: Room) => {
        const total = room.harga * rentDuration;
        const message = `Halo, saya tertarik dengan kamar ${room.nomor_kamar} (${room.tipe}). Durasi: ${rentDuration} bulan. Total: Rp ${total.toLocaleString('id-ID')}. Apakah tersedia?`;
        window.open(`https://wa.me/628123456789?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500 selection:text-white">
            {/* Hero Section */}
            <div className="relative min-h-screen w-full">
                <AuroraBackground className="h-full">
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center h-full py-20 md:py-0"
                    >
                        {/* Text Content */}
                        <div className="text-left">
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 leading-tight">
                                Lebih Dari Sekadar <br /> Tempat Tidur.
                            </h1>
                            <p className="text-base md:text-lg text-neutral-300 mb-8 leading-relaxed">
                                Rasakan pengalaman tinggal di <strong>Dirgantara Kost</strong>.
                                Hunian eksklusif yang dirancang untuk produktivitas dan kenyamanan mutlak.
                                Fasilitas hotel berbintang, kehangatan rumah sendiri.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <a
                                    href="#catalog"
                                    className="px-8 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold transition shadow-lg shadow-teal-500/20 text-center"
                                >
                                    Pilih Kamar Anda
                                </a>
                                <Link
                                    to="/login"
                                    className="px-8 py-3 rounded-full border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium transition text-center"
                                >
                                    Login Pemilik
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-neutral-500 font-light">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-xs overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <p>Bergabung dengan 100+ penghuni bahagia lainnya.</p>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative hidden md:block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 rotate-2 hover:rotate-0 transition duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                                    alt="Modern Interior"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-bold text-lg">Suite Eksklusif Tipe A</p>
                                    <p className="text-neutral-300 text-sm">Mulai Rp 2.5jt / bulan</p>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                        </div>
                    </motion.div>
                </AuroraBackground>
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                </div>
            </div>

            <div id="catalog" className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Kamar Tersedia
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms?.map((room) => (
                        <div key={room.id} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-teal-500 transition duration-300">
                            <div className="h-48 overflow-hidden">
                                <img src={room.fotoUrl} alt={room.nomor_kamar} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold">Kamar {room.nomor_kamar}</h3>
                                    <span className="px-3 py-1 bg-teal-900/40 text-teal-400 rounded-full text-xs border border-teal-800">
                                        {room.tipe}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-teal-500 mb-4">
                                    Rp {room.harga.toLocaleString('id-ID')}<span className="text-sm text-neutral-400 font-normal">/bulan</span>
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {room.fasilitas.slice(0, 3).map((f: string, i: number) => (
                                        <span key={i} className="text-xs text-neutral-400 flex items-center gap-1">
                                            <Check size={12} /> {f}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    borderRadius="0.5rem"
                                    className="w-full bg-neutral-950 text-white border-neutral-800"
                                    onClick={() => {
                                        setSelectedRoom(room);
                                        setRentDuration(1);
                                    }}
                                >
                                    Detail & Sewa
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-neutral-900 py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-teal-500">Lokasi Strategis</h2>
                        <p className="text-neutral-300 mb-6 text-lg leading-relaxed">
                            Terletak di jantung kota, dekat dengan pusat bisnis dan kampus ternama.
                            Akses mudah ke transportasi umum dan pusat perbelanjaan.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-black rounded-lg text-teal-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Alamat Lengkap</h4>
                                    <p className="text-neutral-400">Jl. Mawar Melati Indah No. 88, Kemang, Jakarta Selatan, 12730</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-black rounded-lg text-teal-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Petunjuk Arah</h4>
                                    <p className="text-neutral-400">5 menit dari MRT Blok M, tepat di belakang Grand Lucky Supermarket.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition duration-500 border border-neutral-800">
                        {/* Placeholder Map - In real app, use Google Maps Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.059275062637!2d106.80963531476932!3d-6.255925995471676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f17d3375c333%3A0x6b2e3f0f7f3f3f3f!2sKemang%2C%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1625633845014!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            <footer className="bg-black py-8 text-center text-neutral-600 border-t border-neutral-900">
                <p>&copy; Dirgintara Kost Eksklusif Management. All rights reserved.</p>
            </footer>

            <AnimatePresence>
                {selectedRoom && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-neutral-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-neutral-700"
                        >
                            <div className="relative h-64">
                                <img src={selectedRoom.fotoUrl} alt="Room" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setSelectedRoom(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">Kamar {selectedRoom.nomor_kamar}</h2>
                                        <p className="text-neutral-400">Tipe: {selectedRoom.tipe}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-teal-500">
                                            Rp {selectedRoom.harga.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-sm text-neutral-500">per bulan</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                        <Info size={18} className="text-teal-500" /> Fasilitas
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {selectedRoom.fasilitas.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 text-neutral-300">
                                                <Check size={16} className="text-teal-500" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                                    <h3 className="font-semibold mb-4">Kalkulator Sewa</h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <label className="text-sm text-neutral-400">Durasi (Bulan):</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={rentDuration}
                                            onChange={(e) => setRentDuration(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 w-20 text-center focus:ring-2 focus:ring-teal-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-neutral-700">
                                        <span className="text-lg">Total Pembayaran</span>
                                        <span className="text-2xl font-bold text-teal-400">
                                            Rp {(selectedRoom.harga * rentDuration).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => handleBooking(selectedRoom)}
                                        className="w-full py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-lg shadow-teal-900/20"
                                    >
                                        <Phone size={20} />
                                        Booking via WhatsApp
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
