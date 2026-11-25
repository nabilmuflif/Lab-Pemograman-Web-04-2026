
import { Suspense } from "react";
import Link from "next/link";
import dataBuku from "@/data/dataBuku";

// Komponen yang membaca params
async function DetailBukuContent({ params }) {
  const { id } = await params;

  // Mencari buku berdasarkan ID
  const buku = dataBuku.find(
    (item) => String(item.id) === String(id)
  );

  // Jika buku tidak ditemukan
  if (!buku) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
          <span className="text-6xl">📚</span>

          <h1 className="mt-5 text-2xl font-extrabold text-amber-950">
            Buku Tidak Ditemukan
          </h1>

          <p className="mt-3 text-gray-500">
            Maaf, buku dengan ID {id} tidak tersedia
            dalam koleksi Pustaka Senja.
          </p>

          <Link
            href="/katalog"
            className="mt-7 inline-block rounded-xl bg-amber-800 px-6 py-3 font-bold text-white hover:bg-amber-950"
          >
            ← Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">

      {/* TOMBOL KEMBALI */}
      <Link
        href="/katalog"
        className="inline-block text-sm font-bold text-amber-800 hover:text-amber-950"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">

        {/* COVER */}
        <div className="flex h-64 items-center justify-center bg-linear-to-br from-amber-100 to-orange-200">
          <span className="text-9xl">
            {buku.kategori === "Teknologi"
              ? "💻"
              : buku.kategori === "Fiksi"
              ? "📖"
              : "🌱"}
          </span>
        </div>

        {/* DETAIL */}
        <div className="p-7 md:p-10">

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-900">
              {buku.kategori}
            </span>

            {buku.tersedia ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-700">
                ● Tersedia
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-700">
                ● Sedang Dipinjam
              </span>
            )}
          </div>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-amber-950 md:text-4xl">
            {buku.judul}
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Oleh {buku.penulis}
          </p>

          {/* INFORMASI BUKU */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="rounded-xl bg-amber-50 p-5">
              <p className="text-sm text-gray-500">
                Tahun Terbit
              </p>

              <p className="mt-2 text-xl font-bold text-amber-950">
                {buku.tahun}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-5">
              <p className="text-sm text-gray-500">
                Status Buku
              </p>

              <p className="mt-2 text-xl font-bold text-amber-950">
                {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
              </p>
            </div>

          </div>

          {/* SINOPSIS */}
          <div className="mt-9">
            <h2 className="text-2xl font-extrabold text-amber-950">
              Sinopsis Buku
            </h2>

            <p className="mt-4 text-base leading-8 text-gray-600">
              {buku.sinopsis}
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-9 border-t border-amber-100 pt-6">
            <p className="text-sm text-gray-400">
              Pustaka Senja · Koleksi Buku ID {buku.id}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

// Halaman utama
export default function DetailBuku({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-lg font-semibold text-amber-900">
            Memuat detail buku...
          </p>
        </div>
      }
    >
      <DetailBukuContent params={params} />
    </Suspense>
  );
}
