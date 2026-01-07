import Dexie, { type Table } from 'dexie';

export interface Room {
    id?: number;
    nomor_kamar: string;
    tipe: 'AC' | 'Non-AC';
    harga: number;
    status: 'tersedia' | 'terisi' | 'perbaikan' | 'booking';
    fasilitas: string[];
    fotoUrl: string;
}

export interface Tenant {
    id?: number;
    nama: string;
    no_hp: string;
    roomId: number;
    tanggal_masuk: string;
    tanggal_jatuh_tempo: string;
    status_pembayaran: 'lunas' | 'menunggak';
}

export class KostDatabase extends Dexie {
    rooms!: Table<Room>;
    tenants!: Table<Tenant>;

    constructor() {
        super('KostDB');
        this.version(1).stores({
            rooms: '++id, nomor_kamar, tipe, status',
            tenants: '++id, nama, roomId, status_pembayaran'
        });
    }
}

export const db = new KostDatabase();

export async function seedDatabase() {
    const count = await db.rooms.count();
    if (count === 0) {
        await db.rooms.bulkAdd([
            {
                nomor_kamar: '101',
                tipe: 'AC',
                harga: 1500000,
                status: 'tersedia',
                fasilitas: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Meja Belajar'],
                fotoUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
            },
            {
                nomor_kamar: '102',
                tipe: 'Non-AC',
                harga: 850000,
                status: 'tersedia',
                fasilitas: ['WiFi', 'Kamar Mandi Luar', 'Kasur Single'],
                fotoUrl: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2070&auto=format&fit=crop'
            },
            {
                nomor_kamar: '103',
                tipe: 'AC',
                harga: 1600000,
                status: 'terisi',
                fasilitas: ['AC', 'WiFi', 'Water Heater', 'Smart TV'],
                fotoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop'
            },
            {
                nomor_kamar: '104',
                tipe: 'AC',
                harga: 1400000,
                status: 'perbaikan',
                fasilitas: ['AC', 'WiFi', 'Meja Kerja'],
                fotoUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop'
            },
            {
                nomor_kamar: '105',
                tipe: 'Non-AC',
                harga: 900000,
                status: 'tersedia',
                fasilitas: ['WiFi', 'Lemari Besar', 'Ventilasi Bagus'],
                fotoUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop'
            }
        ]);
        console.log("Database seeded!");
    }
}
