"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

function BukuCard({ buku }) {
  const [sudahFavorit, setSudahFavorit] = useState(false);

  function handleKlikFavorit() {
    setSudahFavorit(!sudahFavorit);
  }

  let teksStatus = "";
  let kelasStatus = "";

  if (buku.tersedia === true) {
    teksStatus = "Tersedia";
    kelasStatus =
      "inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800";
  } else if (buku.tersedia === false) {
    teksStatus = "Sedang Dipinjam";
    kelasStatus =
      "inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800";
  } else {
    teksStatus = "Belum Dikonfirmasi";
    kelasStatus =
      "inline-block rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold text-stone-700";
  }

  let teksFavorit = "";
  let kelasFavorit = "";

  if (sudahFavorit) {
    teksFavorit = "Favorit";
    kelasFavorit =
      "rounded-full border border-cokelat bg-cokelat px-4 py-2 text-sm font-medium text-krem";
  } else {
    teksFavorit = "Suka";
    kelasFavorit =
      "rounded-full border border-cokelat px-4 py-2 text-sm font-medium text-cokelat hover:bg-beige";
  }

  return (
    <article className=" flex flex-col rounded-4xl border border-beige-tua bg-white p-5 shadow-sm
  transition duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none">
      <span className="text-xs font-semibold uppercase tracking-wide text-sage-tua">
        {buku.kategori}
      </span>

      <Link
        href={`/katalog/${buku.id}`}
        className="mt-2 font-serif text-xl font-bold text-cokelat hover:underline"
      >
        {buku.judul}
      </Link>

      <Link className="mt-1 text-sm text-cokelat-muda  hover:underline" href={`/katalog/${buku.id}`}>{buku.penulis}</Link>
      <Link className="text-sm text-cokelat-muda hover:underline" href={`/katalog/${buku.id}`}>Terbit {buku.tahun}</Link>

      <div className="mt-3">
        <span className={kelasStatus}>{teksStatus}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={handleKlikFavorit}
          className={kelasFavorit}
        >
          {teksFavorit}
        </button>

        <Link
          href={`/katalog/${buku.id}/edit`}
          className="rounded-full border border-sage-tua px-4 py-2 text-sm font-medium text-sage-tua hover:bg-sage-muda"
        >
          Edit
        </Link>

        <TombolHapus id={buku.id} judul={buku.judul} />
      </div>
    </article>
  );
}

export default BukuCard;
