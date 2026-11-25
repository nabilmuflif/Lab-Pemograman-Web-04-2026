import { Suspense } from "react";
import pool from "@/lib/db";
import { tambahProduk } from "./action";
import TombolHapus from "@/components/TombolHapus";
import Link from "next/link";

// Komponen untuk mengambil dan menampilkan data produk
async function DaftarProduk() {
    const { rows } = await pool.query(
        "SELECT * FROM produk ORDER BY id"
    );

    return (
        <>
            {/* Informasi Dashboard */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Total Produk
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-blue-600">
                        {rows.length}
                    </h2>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Status Database
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-green-600">
                        Terhubung
                    </h2>
                </div>

            </div>

            {/* Form Tambah Produk */}
            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        Tambah Produk Baru
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Masukkan informasi produk yang ingin ditambahkan.
                    </p>
                </div>

                <form
                    action={tambahProduk}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >

                    {/* Nama Produk */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Nama Produk
                        </label>

                        <input
                            type="text"
                            name="nama"
                            placeholder="Contoh: Laptop ASUS"
                            required
                            maxLength={100}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Harga Produk */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Harga Produk
                        </label>

                        <input
                            type="number"
                            name="harga"
                            placeholder="Contoh: 500000"
                            min="1"
                            step="1"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Tombol Tambah */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Tambah Produk
                        </button>
                    </div>

                </form>
            </div>

            {/* Tabel Daftar Produk */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-bold text-slate-800">
                        Daftar Produk
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Data produk dari database PostgreSQL.
                    </p>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full text-left text-sm">

                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Nama Produk</th>
                                <th className="px-6 py-4 text-right">Harga</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {rows.map((produk) => (
                                <tr
                                    key={produk.id}
                                    className="transition hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4 text-slate-500">
                                        #{produk.id}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {produk.nama}
                                    </td>

                                    <td className="px-6 py-4 text-right font-semibold text-slate-700">
                                        Rp {Number(produk.harga).toLocaleString("id-ID")}
                                    </td>

                                    {/* Tombol Edit dan Hapus */}
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">

                                            <Link
                                                href={`/produk/edit/${produk.id}`}
                                                className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                                            >
                                                Edit
                                            </Link>

                                            <TombolHapus id={produk.id} />

                                        </div>
                                    </td>

                                </tr>
                            ))}

                            {rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-10 text-center text-slate-500"
                                    >
                                        Belum ada produk di database.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>

                <div className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
                    Menampilkan {rows.length} produk.
                </div>

            </div>
        </>
    );
}

// Halaman utama
export default function ProdukPage() {

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Dashboard
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Manajemen Produk
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Daftar produk yang tersimpan di database PostgreSQL.
                    </p>

                </div>

                {/* Loading Data */}
                <Suspense
                    fallback={
                        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                            <p className="font-medium text-slate-600">
                                Memuat data produk...
                            </p>
                        </div>
                    }
                >
                    <DaftarProduk />
                </Suspense>

            </div>

        </main>
    );
}
