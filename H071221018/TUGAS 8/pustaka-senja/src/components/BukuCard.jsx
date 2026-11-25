"use client";

import { useState } from "react";
import Link from "next/link";

function BukuCard({ buku }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* COVER BUKU */}
      <div className="flex h-48 items-center justify-center bg-linear-to-br from-amber-100 to-orange-200">

        <span className="text-7xl">
          {buku.kategori === "Teknologi"
            ? "💻"
            : buku.kategori === "Fiksi"
            ? "📖"
            : "🌱"}
        </span>

      </div>

      <div className="p-5">

        {/* KATEGORI DAN STATUS */}
        <div className="flex flex-wrap items-center justify-between gap-2">

          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            {buku.kategori}
          </span>

          {buku.tersedia ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Tersedia
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
              Sedang Dipinjam
            </span>
          )}

        </div>

        {/* INFORMASI BUKU */}
        <h3 className="mt-4 min-h-14 text-lg font-extrabold text-amber-950">
          {buku.judul}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {buku.penulis}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Tahun terbit: {buku.tahun}
        </p>

        {/* TOMBOL */}
        <div className="mt-5 flex gap-2">

          <Link
            href={`/katalog/${buku.id}`}
            className="flex-1 rounded-lg bg-amber-800 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-amber-950"
          >
            Lihat Detail
          </Link>

          <button
            type="button"
            onClick={() => setFavorit(!favorit)}
            aria-pressed={favorit}
            aria-label={favorit ? `Hapus ${buku.judul} dari favorit` : `Simpan ${buku.judul} ke favorit`}
            className={`rounded-lg border px-4 py-3 text-lg transition ${
              favorit
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-amber-200 bg-white text-gray-500 hover:bg-amber-50"
            }`}
          >
            {favorit ? "♥" : "♡"}
          </button>

        </div>

        {favorit && (
          <p className="mt-3 text-center text-xs font-semibold text-red-500">
            ♥ Ditambahkan ke favorit
          </p>
        )}

      </div>

    </div>
  );
}

export default BukuCard;