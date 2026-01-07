import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/aurora-background';
import { ModeToggle } from '../components/mode-toggle';
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
        <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white font-sans selection:bg-teal-500 selection:text-white">
            <ModeToggle />
            {/* Hero Section */}
            <div className="relative min-h-screen w-full">
                <AuroraBackground className="h-full bg-white dark:bg-black text-neutral-900 dark:text-white">
                    <motion.div
                        initial={{ opacity: 0.0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end justify-center h-screen pb-20 md:pb-32"
                    >
                        {/* Text Content */}
                        <div className="text-left order-2 md:order-1 flex flex-col justify-center">
                            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 mb-6 leading-tight">
                                Lebih Dari Sekadar <br /> Tempat Tidur.
                            </h1>
                            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                                Rasakan pengalaman tinggal di <strong>Dirgantara Kost</strong>.
                                Hunian eksklusif yang dirancang untuk produktivitas dan kenyamanan mutlak.
                                Fasilitas hotel berbintang, kehangatan rumah sendiri.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start">
                                <a
                                    href="#catalog"
                                    className="px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold transition shadow-lg shadow-teal-500/20 text-center w-full sm:w-auto"
                                >
                                    Pilih Kamar Anda
                                </a>
                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                    <Link
                                        to="/login"
                                        className="px-8 py-4 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium transition text-center"
                                    >
                                        Login Pemilik
                                    </Link>
                                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 italic text-center">
                                        *Ingin liat demo dashboard admin owner? Klik button ini
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-neutral-500 font-light hidden sm:flex">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <p>Bergabung dengan 100+ penghuni bahagia lainnya.</p>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative order-1 md:order-2 w-full flex items-center justify-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 rotate-0 md:rotate-2 hover:rotate-0 transition duration-500 group w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                                    alt="Modern Interior"
                                    className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-white font-bold text-lg">Suite Eksklusif Tipe A</p>
                                    <p className="text-sm text-neutral-300">Mulai Rp 2.5jt / bulan</p>
                                </div>
                            </div>
                            {/* Decorative Elements - Hide on mobile to reduce clutter */}
                            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl hidden md:block opacity-50 dark:opacity-100"></div>
                            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl hidden md:block opacity-50 dark:opacity-100"></div>
                        </div>
                    </motion.div>
                </AuroraBackground>
                {/* Scroll Indicator Removed */}
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-neutral-50 dark:bg-neutral-900/50 py-20 px-4 border-y border-neutral-200 dark:border-neutral-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-700 dark:from-teal-400 dark:to-emerald-600 mb-4">
                            Kenapa Memilih Dirgantara?
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Kami menyediakan lebih dari sekadar tempat istirahat. Nikmati fasilitas umum yang menunjang gaya hidup modern Anda, tanpa biaya tambahan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>,
                                title: "Keamanan 24/7",
                                desc: "Sistem keamanan CCTV 24 jam dan penjaga keamanan profesional menjamin ketenangan pikiran Anda."
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>,
                                title: "High-Speed WiFi",
                                desc: "Internet fiber optic berkecepatan tinggi dedicated untuk setiap lantai. Work from home tanpa hambatan."
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>,
                                title: "Parkir Luas",
                                desc: "Area parkir mobil dan motor yang luas, tertutup kanopi, dan diawasi kamera pengawas."
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M3 14h18" /><path d="M4 14h16v-4h-3.4c-.6-1.5-3-3-3-3l-2.1-.7c-2.3-.8-4.7 1-4.7 3.4V14z" /><path d="M4 14h16v4h-3.4c-.6 1.5-3 3-3 3l-2.1.7c-2.3.8-4.7-1-4.7-3.4V14z" /></svg>,
                                title: "Dapur Bersama",
                                desc: "Dapur modern lengkap dengan kulkas, kompor, microwave, dan dispenser air minum gratis."
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>,
                                title: "Laundry & Cleaning",
                                desc: "Layanan laundry kiloan pickup-delivery dan pembersihan kamar mandi mingguan (opsional)."
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
                                title: "Maintenance Cepat",
                                desc: "Tim teknisi in-house siap sedia menangani kerusakan AC, listrik, atau plumbing dengan cepat."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-6 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-teal-500/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition duration-300 shadow-sm dark:shadow-none">
                                <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg w-fit mb-4 group-hover:scale-110 transition duration-300 border border-neutral-200 dark:border-neutral-800 group-hover:border-teal-500/30">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">{feature.title}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="catalog" className="max-w-7xl mx-auto px-4 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400">
                    Kamar Tersedia
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms?.map((room) => (
                        <div key={room.id} className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 transition duration-300 shadow-sm dark:shadow-none">
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

            <div className="bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-teal-600 dark:text-teal-500">Lokasi Strategis</h2>
                        <p className="text-neutral-600 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
                            Terletak di jantung kota, dekat dengan pusat bisnis dan kampus ternama.
                            Akses mudah ke transportasi umum dan pusat perbelanjaan.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white dark:bg-black rounded-lg text-teal-600 dark:text-teal-500 shadow-sm dark:shadow-none border border-neutral-200 dark:border-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 dark:text-white">Alamat Lengkap</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400">Jl. Mawar Melati Indah No. 88, Kemang, Jakarta Selatan, 12730</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white dark:bg-black rounded-lg text-teal-600 dark:text-teal-500 shadow-sm dark:shadow-none border border-neutral-200 dark:border-neutral-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-neutral-900 dark:text-white">Petunjuk Arah</h4>
                                    <p className="text-neutral-600 dark:text-neutral-400">5 menit dari MRT Blok M, tepat di belakang Grand Lucky Supermarket.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[400px] w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition duration-500 border border-neutral-200 dark:border-neutral-800 shadow-lg">
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

            <footer className="bg-white dark:bg-black py-8 text-center text-neutral-500 dark:text-neutral-600 border-t border-neutral-200 dark:border-neutral-900">
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
