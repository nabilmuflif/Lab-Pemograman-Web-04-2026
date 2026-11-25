"use client";

import { useState } from "react";

import dataBuku from "@/data/dataBuku";
import BukuCard from "@/components/BukuCard";

export default function KatalogPage() {

  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const daftarKategori = [
    "Semua",
    "Teknologi",
    "Fiksi",
    "Pengembangan Diri",
  ];

  // FILTER BUKU
  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter(
          (buku) => buku.kategori === kategoriAktif
        );

  return (
    <div className="min-h-screen">

      {/* HEADER KATALOG */}
      <section className="bg-linear-to-br from-amber-950 to-amber-800 px-5 py-16 text-center text-white">

        <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
          Koleksi Pustaka Senja
        </p>

        <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
          Katalog Buku
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-amber-100">
          Temukan buku favoritmu dan jelajahi berbagai
          pengetahuan serta cerita menarik.
        </p>

      </section>

      {/* DAFTAR KATALOG */}
      <main className="mx-auto max-w-7xl px-5 py-12">

        {/* JUDUL DAN JUMLAH */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <h2 className="text-2xl font-extrabold text-amber-950">
              Jelajahi Koleksi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Pilih kategori untuk menemukan buku.
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900">
            {bukuTampil.length} Buku
          </span>

        </div>

        {/* FILTER KATEGORI */}
        <div className="mt-7 flex flex-wrap gap-3">

          {daftarKategori.map((kategori) => (
            <button
              key={kategori}
              type="button"
              onClick={() => setKategoriAktif(kategori)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                kategoriAktif === kategori
                  ? "bg-amber-900 text-white shadow-md"
                  : "border border-amber-200 bg-white text-amber-900 hover:bg-amber-100"
              }`}
            >
              {kategori}
            </button>
          ))}

        </div>

        {/* DAFTAR BUKU */}
        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {bukuTampil.length > 0 ? (
            bukuTampil.map((buku) => (
              <BukuCard
                key={buku.id}
                buku={buku}
              />
            ))
          ) : (
            <div className="col-span-full rounded-xl bg-white p-10 text-center">
              Buku tidak ditemukan.
            </div>
          )}

        </div>

      </main>

    </div>
  );
}