"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import { DAFTAR_KATEGORI } from "@/lib/konstanta";

const daftarKategori = ["Semua"].concat(DAFTAR_KATEGORI);

// Filter kategori dari Praktikum 8 dipertahankan. Datanya sendiri berasal dari
// PostgreSQL (diambil oleh Server Component halaman Katalog) dan dikirim lewat props.
function FilterKatalog({ daftarBuku }) {
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua");

  let bukuDitampilkan = [];

  if (kategoriDipilih === "Semua") {
    bukuDitampilkan = daftarBuku;
  } else {
    bukuDitampilkan = daftarBuku.filter(function (buku) {
      return buku.kategori === kategoriDipilih;
    });
  }

  let isiDaftar = null;

  if (bukuDitampilkan.length === 0) {
    isiDaftar = (
      <p className="mt-8 rounded-2xl border border-beige-tua bg-white p-6 text-center text-cokelat-muda">
        Belum ada buku pada kategori ini.
      </p>
    );
  } else {
    isiDaftar = (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bukuDitampilkan.map(function (buku) {
          return <BukuCard key={buku.id} buku={buku} />;
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="mt-6 flex flex-wrap gap-2">
        {daftarKategori.map(function (kategori) {
          let kelasTombol = "";

          if (kategori === kategoriDipilih) {
            kelasTombol =
              "rounded-full bg-cokelat px-5 py-2 text-sm font-semibold text-krem";
          } else {
            kelasTombol =
              "rounded-full border border-beige-tua bg-white px-5 py-2 text-sm font-medium text-cokelat-muda hover:bg-beige";
          }

          return (
            <button
              key={kategori}
              type="button"
              onClick={function () {
                setKategoriDipilih(kategori);
              }}
              className={kelasTombol}
            >
              {kategori}
            </button>
          );
        })}
      </div>

      {isiDaftar}
    </div>
  );
}

export default FilterKatalog;
