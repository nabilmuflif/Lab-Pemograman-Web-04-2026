
import "server-only";
import pool from "@/lib/db";
import { DAFTAR_KATEGORI, PILIHAN_STATUS } from "@/lib/konstanta";


const ID_MAKSIMAL = 2147483647;

export function parseId(nilai) {
  const teks = String(nilai ?? "").trim();

  if (!/^\d+$/.test(teks)) {
    return null;
  }

  const angka = Number(teks);

  if (angka < 1 || angka > ID_MAKSIMAL) {
    return null;
  }

  return angka;
}

export async function ambilSemuaBuku() {
  const hasil = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku ORDER BY id ASC"
  );
  return hasil.rows;
}

export async function ambilBukuById(id) {
  const hasil = await pool.query(
    "SELECT id, judul, penulis, kategori, tahun, tersedia, sinopsis FROM buku WHERE id = $1",
    [id]
  );

  if (hasil.rows.length === 0) {
    return null;
  }

  return hasil.rows[0];
}

export async function ambilStatistik() {
  const hasil = await pool.query(
    `SELECT
       COUNT(*)::int AS total,
       COUNT(*) FILTER (WHERE tersedia = true)::int AS tersedia,
       COUNT(*) FILTER (WHERE tersedia = false)::int AS dipinjam
     FROM buku`
  );
  return hasil.rows[0];
}

export function validasiBuku(formData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunTeks = String(formData.get("tahun") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const sinopsis = String(formData.get("sinopsis") ?? "").trim();

  const errors = {};
  const tahunMaksimal = new Date().getFullYear() + 1;

  if (judul === "") {
    errors.judul = "Judul buku wajib diisi.";
  } else if (judul.length > 255) {
    errors.judul = "Judul maksimal 255 karakter.";
  }

  if (penulis === "") {
    errors.penulis = "Nama penulis wajib diisi.";
  } else if (penulis.length > 255) {
    errors.penulis = "Nama penulis maksimal 255 karakter.";
  }

  if (!DAFTAR_KATEGORI.includes(kategori)) {
    errors.kategori = "Pilih salah satu kategori yang tersedia.";
  }

  let tahun = null;

  if (tahunTeks === "") {
    errors.tahun = "Tahun terbit wajib diisi.";
  } else if (!/^\d+$/.test(tahunTeks)) {
    errors.tahun = "Tahun terbit harus berupa angka bulat, contoh: 2020.";
  } else {
    tahun = Number(tahunTeks);
    if (tahun < 1000 || tahun > tahunMaksimal) {
      errors.tahun = "Tahun terbit harus antara 1000 dan " + tahunMaksimal + ".";
      tahun = null;
    }
  }

  const statusValid = PILIHAN_STATUS.some(function (pilihan) {
    return pilihan.nilai === status;
  });

  if (!statusValid) {
    errors.status = "Pilih status ketersediaan buku.";
  }

  if (sinopsis === "") {
    errors.sinopsis = "Sinopsis wajib diisi.";
  } else if (sinopsis.length > 3000) {
    errors.sinopsis = "Sinopsis maksimal 3000 karakter.";
  }

  return {
    errors: errors,
    data: { judul, penulis, kategori, tahun, status, sinopsis },
  };
}
