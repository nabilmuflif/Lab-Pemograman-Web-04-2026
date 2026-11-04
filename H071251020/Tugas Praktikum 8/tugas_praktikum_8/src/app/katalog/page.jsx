"use client";

import { useState } from "react";
import dataBuku from "@/data/dataBuku";
import BukuCard from "@/components/BukuCard";

const daftarKategori = [
  "Semua",
  "Teknologi",
  "Fiksi",
  "Pengembangan Diri",
];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTersaring =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((b) => b.kategori === kategoriAktif);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Katalog Buku</h1>
        <p className="text-slate-400 mt-1">
          Telusuri koleksi buku di Pustaka Senja.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {daftarKategori.map((kat) => (
          <button
            key={kat}
            onClick={() => setKategoriAktif(kat)}
            className={
              kategoriAktif === kat
                ? "bg-amber-600 text-white px-4 py-1.5 rounded-full text-sm font-medium"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 px-4 py-1.5 rounded-full text-sm"
            }
          >
            {kat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {bukuTersaring.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </section>
  );
}