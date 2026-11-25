
import { Suspense } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import pool from "@/lib/db";
import { updateProduk } from "../../action";

// Komponen untuk mengambil data dan menampilkan form edit
async function FormEditProduk({ params }) {

    // Mengambil parameter URL
    const { id } = await params;

    // Menjalankan proses secara dinamis
    await connection();

    // Validasi ID
    const produkId = Number(id);

    if (!Number.isInteger(produkId) || produkId <= 0) {
        notFound();
    }

    // Mengambil data produk dari PostgreSQL
    const { rows } = await pool.query(
        "SELECT * FROM produk WHERE id = $1",
        [produkId]
    );

    // Memeriksa keberadaan produk
    if (rows.length === 0) {
        notFound();
    }

    const produk = rows[0];

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">

            <form action={updateProduk} className="space-y-5">

                {/* ID Produk */}
                <input
                    type="hidden"
                    name="id"
                    value={produk.id}
                />

                {/* Nama Produk */}
                <div>
                    <label
                        htmlFor="nama"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Nama Produk
                    </label>

                    <input
                        id="nama"
                        type="text"
                        name="nama"
                        defaultValue={produk.nama}
                        placeholder="Masukkan nama produk"
                        required
                        maxLength={100}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Harga Produk */}
                <div>
                    <label
                        htmlFor="harga"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Harga Produk
                    </label>

                    <input
                        id="harga"
                        type="number"
                        name="harga"
                        placeholder="Masukkan harga baru"
                        min="1"
                        step="1"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Silakan masukkan harga baru untuk produk ini.
                    </p>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col gap-3 pt-3 sm:flex-row">

                    <button
                        type="submit"
                        className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Simpan Perubahan
                    </button>

                    <Link
                        href="/produk"
                        className="rounded-lg bg-slate-200 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-300"
                    >
                        Batal
                    </Link>

                </div>

            </form>

            {/* Informasi Produk */}
            <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                    Sedang mengedit produk dengan ID #{produk.id}.
                </p>
            </div>

        </div>
    );
}

// Halaman utama
export default function EditProdukPage({ params }) {

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-10">

            <div className="mx-auto max-w-xl">

                {/* Header */}
                <div className="mb-6">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Manajemen Produk
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Edit Produk
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Perbarui informasi produk yang tersimpan di database PostgreSQL.
                    </p>

                </div>

                {/* Suspense */}
                <Suspense
                    fallback={
                        <div className="rounded-xl bg-white p-10 text-center shadow-sm">

                            <div className="mb-3 flex justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                            </div>

                            <p className="font-medium text-slate-600">
                                Memuat data produk...
                            </p>

                        </div>
                    }
                >
                    <FormEditProduk params={params} />
                </Suspense>

                {/* Tombol Kembali */}
                <div className="mt-5">
                    <Link
                        href="/produk"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        ← Kembali ke Daftar Produk
                    </Link>
                </div>

            </div>

        </main>
    );
}
