"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { parseId, validasiBuku } from "@/lib/buku";
import { statusKeBoolean } from "@/lib/konstanta";

const PESAN_GAGAL_SIMPAN =
  "Terjadi kesalahan pada server saat menyimpan data. Silakan coba lagi.";

export async function tambahBuku(stateSebelumnya, formData) {
  const { errors, data } = validasiBuku(formData);

  if (Object.keys(errors).length > 0) {
    return { errors: errors, pesan: "Periksa kembali isian formulir." };
  }

  try {
    await pool.query(
      `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        data.judul,
        data.penulis,
        data.kategori,
        data.tahun,
        statusKeBoolean(data.status),
        data.sinopsis,
      ]
    );
  } catch (error) {
    // Detail error hanya dicatat di terminal server, tidak dikirim ke browser.
    console.error("Gagal menambah buku:", error.message);
    return { errors: {}, pesan: PESAN_GAGAL_SIMPAN };
  }

  revalidatePath("/katalog");
  revalidatePath("/");

  // redirect() bekerja dengan melempar error khusus, jadi harus di luar try/catch.
  redirect("/katalog");
}

// ---------------------------------------------------------------------------
// UPDATE: mengubah buku. id dikirim lewat input hidden "id" pada formulir.
// ---------------------------------------------------------------------------
export async function ubahBuku(stateSebelumnya, formData) {
  const id = parseId(formData.get("id"));

  if (id === null) {
    return { errors: {}, pesan: "ID buku tidak valid." };
  }

  const { errors, data } = validasiBuku(formData);

  if (Object.keys(errors).length > 0) {
    return { errors: errors, pesan: "Periksa kembali isian formulir." };
  }

  let hasil;

  try {
    // WHERE id = $7 memastikan hanya buku yang dipilih yang berubah.
    hasil = await pool.query(
      `UPDATE buku
       SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6
       WHERE id = $7`,
      [
        data.judul,
        data.penulis,
        data.kategori,
        data.tahun,
        statusKeBoolean(data.status),
        data.sinopsis,
        id,
      ]
    );
  } catch (error) {
    console.error("Gagal mengubah buku:", error.message);
    return { errors: {}, pesan: PESAN_GAGAL_SIMPAN };
  }

  if (hasil.rowCount === 0) {
    return {
      errors: {},
      pesan: "Buku tidak ditemukan. Mungkin sudah dihapus.",
    };
  }

  revalidatePath("/katalog");
  revalidatePath("/katalog/" + id);
  revalidatePath("/");

  redirect("/katalog/" + id);
}

// ---------------------------------------------------------------------------
// DELETE: menghapus satu buku. Dipanggil dari TombolHapus (Client Component)
// setelah pengguna menyetujui window.confirm().
// ---------------------------------------------------------------------------
export async function hapusBuku(idMentah) {
  const id = parseId(idMentah);

  if (id === null) {
    return { sukses: false, pesan: "ID buku tidak valid." };
  }

  let hasil;

  try {
    // WHERE id = $1 memastikan hanya satu buku yang terhapus.
    hasil = await pool.query("DELETE FROM buku WHERE id = $1", [id]);
  } catch (error) {
    console.error("Gagal menghapus buku:", error.message);
    return { sukses: false, pesan: "Buku gagal dihapus. Silakan coba lagi." };
  }

  if (hasil.rowCount === 0) {
    revalidatePath("/katalog");
    revalidatePath("/");
    return { sukses: false, pesan: "Buku tidak ditemukan. Mungkin sudah dihapus." };
  }

  revalidatePath("/katalog");
  revalidatePath("/");

  return { sukses: true, pesan: "Buku berhasil dihapus." };
}
