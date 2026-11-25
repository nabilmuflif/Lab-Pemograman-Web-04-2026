
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

// ==========================================
// TAMBAH PRODUK
// ==========================================
export async function tambahProduk(formData) {

    const nama = formData.get("nama")?.toString().trim();
    const harga = Number(formData.get("harga"));

    // Validasi data
    if (
        !nama ||
        nama.length > 100 ||
        !Number.isSafeInteger(harga) ||
        harga <= 0
    ) {
        throw new Error("Data produk tidak valid.");
    }

    // Simpan ke PostgreSQL
    await pool.query(
        "INSERT INTO produk (nama, harga) VALUES ($1, $2)",
        [nama, harga]
    );

    // Perbarui halaman produk
    revalidatePath("/produk");
}


// ==========================================
// HAPUS PRODUK
// ==========================================
export async function hapusProduk(formData) {

    const id = Number(formData.get("id"));

    // Validasi ID
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("ID produk tidak valid.");
    }

    // Hapus data dari PostgreSQL
    const result = await pool.query(
        "DELETE FROM produk WHERE id = $1 RETURNING id",
        [id]
    );

    if (result.rowCount === 0) {
        throw new Error("Produk tidak ditemukan.");
    }

    // Perbarui halaman produk
    revalidatePath("/produk");
}


// ==========================================
// UPDATE PRODUK
// ==========================================
export async function updateProduk(formData) {

    const id = Number(formData.get("id"));
    const nama = formData.get("nama")?.toString().trim();
    const harga = Number(formData.get("harga"));

    // Validasi data
    if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !nama ||
        nama.length > 100 ||
        !Number.isSafeInteger(harga) ||
        harga <= 0
    ) {
        throw new Error("Data produk tidak valid.");
    }

    // Update data PostgreSQL
    const result = await pool.query(
        `UPDATE produk
         SET nama = $1, harga = $2
         WHERE id = $3
         RETURNING id`,
        [nama, harga, id]
    );

    if (result.rowCount === 0) {
        throw new Error("Produk tidak ditemukan.");
    }

    // Perbarui cache halaman
    revalidatePath("/produk");
    revalidatePath(`/produk/edit/${id}`);

    // Kembali ke daftar produk
    redirect("/produk");
}
