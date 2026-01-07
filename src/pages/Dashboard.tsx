import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';
import { db } from '../lib/db';
import type { Room, Tenant } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import {
    LayoutDashboard,
    BedDouble,
    Users,
    DollarSign,
    AlertTriangle,
    Edit,
    Trash,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'tenants'>('overview');

    const rooms = useLiveQuery(() => db.rooms.toArray());
    const tenants = useLiveQuery(() => db.tenants.toArray());

    // Statistics
    const totalRooms = rooms?.length || 0;
    const occupiedRooms = rooms?.filter(r => r.status === 'terisi').length || 0;
    const availableRooms = rooms?.filter(r => r.status === 'tersedia').length || 0;


    // Real calculation needs room join
    const calculateEstimatedRevenue = () => {
        if (!tenants || !rooms) return 0;
        let total = 0;
        tenants.forEach(t => {
            const room = rooms.find(r => r.id === t.roomId);
            if (room) total += room.harga;
        });
        return total;
    };

    const pendingPayments = tenants?.filter(t => t.status_pembayaran === 'menunggak') || [];

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Owner Dashboard</h1>
                    <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-500 rounded-lg border border-red-900 hover:bg-red-900/40 transition">
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 mb-8">
                    <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18} />}>
                        Ringkasan
                    </NavButton>
                    <NavButton active={activeTab === 'rooms'} onClick={() => setActiveTab('rooms')} icon={<BedDouble size={18} />}>
                        Manajemen Kamar
                    </NavButton>
                    <NavButton active={activeTab === 'tenants'} onClick={() => setActiveTab('tenants')} icon={<Users size={18} />}>
                        Data Penghuni
                    </NavButton>
                </div>

                {/* Content */}
                {activeTab === 'overview' && (
                    <BentoGrid className="max-w-7xl mx-auto">
                        <BentoGridItem
                            title="Okupansi"
                            description={`${occupiedRooms} Terisi / ${availableRooms} Kosong`}
                            header={<div className="h-full min-h-[6rem] bg-gradient-to-br from-teal-500 to-teal-900 rounded-xl flex items-center justify-center text-4xl font-bold">{Math.round((occupiedRooms / (totalRooms || 1)) * 100)}%</div>}
                            icon={<BedDouble className="h-4 w-4 text-neutral-500" />}
                            className="md:col-span-1"
                        />
                        <BentoGridItem
                            title="Estimasi Pendapatan"
                            description="Total potensi pendapatan bulan ini"
                            header={<div className="h-full min-h-[6rem] bg-gradient-to-br from-emerald-500 to-emerald-900 rounded-xl flex items-center justify-center text-2xl font-bold">Rp {calculateEstimatedRevenue().toLocaleString('id-ID')}</div>}
                            icon={<DollarSign className="h-4 w-4 text-neutral-500" />}
                            className="md:col-span-1"
                        />
                        <BentoGridItem
                            title="Perlu Perhatian"
                            description={`${pendingPayments.length} Penghuni menunggak`}
                            header={<div className="h-full min-h-[6rem] bg-gradient-to-br from-red-500 to-red-900 rounded-xl flex items-center justify-center text-4xl font-bold">{pendingPayments.length}</div>}
                            icon={<AlertTriangle className="h-4 w-4 text-neutral-500" />}
                            className="md:col-span-1"
                        />
                    </BentoGrid>
                )}

                {activeTab === 'rooms' && <RoomManager />}
                {activeTab === 'tenants' && <TenantManager rooms={rooms || []} />}
            </div>
        </div>
    );
}

const NavButton = ({ active, onClick, icon, children }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${active ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
            }`}
    >
        {icon} {children}
    </button>
);

// Sub-components for better organization
function RoomManager() {
    const rooms = useLiveQuery(() => db.rooms.toArray());
    const [isEditing, setIsEditing] = useState<Room | null>(null);

    // Form states
    const [formData, setFormData] = useState<Partial<Room>>({
        nomor_kamar: '', tipe: 'AC', harga: 0, status: 'tersedia', fasilitas: [], fotoUrl: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && isEditing.id) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await db.rooms.update(isEditing.id, formData as any);
        } else {
            await db.rooms.add(formData as Room);
        }
        setIsEditing(null);
        setFormData({ nomor_kamar: '', tipe: 'AC', harga: 0, status: 'tersedia', fasilitas: [], fotoUrl: '' });
    };

    const handleDelete = async (id: number) => {
        if (confirm('Hapus kamar ini?')) await db.rooms.delete(id);
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 h-fit">
                <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Kamar' : 'Tambah Kamar Baru'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        placeholder="Nomor Kamar (ex: 101)"
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.nomor_kamar}
                        onChange={e => setFormData({ ...formData, nomor_kamar: e.target.value })}
                        required
                    />
                    <select
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.tipe}
                        onChange={e => setFormData({ ...formData, tipe: e.target.value as any })}
                    >
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Harga per Bulan"
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.harga || ''}
                        onChange={e => setFormData({ ...formData, harga: parseInt(e.target.value) })}
                        required
                    />
                    <input
                        placeholder="URL Foto"
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.fotoUrl}
                        onChange={e => setFormData({ ...formData, fotoUrl: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-teal-600 p-3 rounded-lg font-bold hover:bg-teal-500">Simpan</button>
                        {isEditing && <button type="button" onClick={() => setIsEditing(null)} className="bg-red-600 p-3 rounded-lg">Batal</button>}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="md:col-span-2 space-y-4">
                {rooms?.map(room => (
                    <div key={room.id} className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img src={room.fotoUrl || 'https://via.placeholder.com/100'} className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                                <h4 className="font-bold text-lg">Kamar {room.nomor_kamar}</h4>
                                <p className="text-neutral-400 text-sm">{room.tipe} • Rp {room.harga.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                className={`bg-transparent border border-neutral-700 rounded p-1 text-sm ${room.status === 'tersedia' ? 'text-green-500' :
                                    room.status === 'terisi' ? 'text-blue-500' : 'text-red-500'
                                    }`}
                                value={room.status}
                                onChange={async (e) => {
                                    if (room.id) await db.rooms.update(room.id, { status: e.target.value as any });
                                }}
                            >
                                <option value="tersedia">Tersedia</option>
                                <option value="terisi">Terisi</option>
                                <option value="perbaikan">Perbaikan</option>
                            </select>
                            <button onClick={() => { setIsEditing(room); setFormData(room); }} className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                            <button onClick={() => room.id && handleDelete(room.id)} className="text-red-400 hover:text-red-300"><Trash size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TenantManager({ rooms }: { rooms: Room[] }) {
    const tenants = useLiveQuery(() => db.tenants.toArray());
    const [formData, setFormData] = useState<Partial<Tenant>>({
        nama: '', no_hp: '', roomId: 0, status_pembayaran: 'lunas'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await db.tenants.add({
            ...formData,
            tanggal_masuk: new Date().toISOString(),
            tanggal_jatuh_tempo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        } as Tenant);
        // Auto update room status
        const room = rooms.find(r => r.id == formData.roomId);
        if (room?.id) await db.rooms.update(room.id, { status: 'terisi' });

        setFormData({ nama: '', no_hp: '', roomId: 0, status_pembayaran: 'lunas' });
    };

    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 h-fit">
                <h3 className="text-xl font-bold mb-4">Tambah Penghuni</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        placeholder="Nama Lengkap"
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.nama}
                        onChange={e => setFormData({ ...formData, nama: e.target.value })}
                        required
                    />
                    <input
                        placeholder="No HP (WA)"
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.no_hp}
                        onChange={e => setFormData({ ...formData, no_hp: e.target.value })}
                    />
                    <select
                        className="w-full bg-black border border-neutral-700 p-3 rounded-lg"
                        value={formData.roomId}
                        onChange={e => setFormData({ ...formData, roomId: parseInt(e.target.value) })}
                        required
                    >
                        <option value={0}>Pilih Kamar...</option>
                        {rooms.filter(r => r.status === 'tersedia').map(r => (
                            <option key={r.id} value={r.id}>Kamar {r.nomor_kamar} - {r.tipe}</option>
                        ))}
                    </select>
                    <button type="submit" className="w-full bg-teal-600 p-3 rounded-lg font-bold hover:bg-teal-500">Check In</button>
                </form>
            </div>

            <div className="md:col-span-2 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-neutral-800 text-neutral-400">
                            <th className="p-4">Nama</th>
                            <th className="p-4">Kamar</th>
                            <th className="p-4">Jatuh Tempo</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants?.map(tenant => {
                            const room = rooms.find(r => r.id === tenant.roomId);
                            return (
                                <tr key={tenant.id} className="border-b border-neutral-800 hover:bg-neutral-900/50">
                                    <td className="p-4 font-medium">{tenant.nama}</td>
                                    <td className="p-4">{room?.nomor_kamar || 'Unknown'}</td>
                                    <td className="p-4">{new Date(tenant.tanggal_jatuh_tempo).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs ${tenant.status_pembayaran === 'lunas' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                                            {tenant.status_pembayaran.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => tenant.id && db.tenants.update(tenant.id, { status_pembayaran: tenant.status_pembayaran === 'lunas' ? 'menunggak' : 'lunas' })}
                                            className="text-xs text-blue-400 hover:underline"
                                        >
                                            Ubah Status
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
