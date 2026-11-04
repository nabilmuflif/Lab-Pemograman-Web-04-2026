import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((b) => b.id === id);

  if (!buku) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-400 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan.
        </h1>
        <Link
          href="/katalog"
          className="text-amber-400 hover:underline"
        >
          ← Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-medium">
            {buku.kategori}
          </span>
          <span
            className={
              buku.tersedia
                ? "text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full"
                : "text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full"
            }
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">{buku.judul}</h1>
        <p className="text-slate-400 mb-1">oleh {buku.penulis}</p>
        <p className="text-sm text-slate-500 mb-6">Terbit tahun {buku.tahun}</p>

        <div className="border-t border-slate-800 pt-4">
          <h2 className="text-lg font-semibold text-amber-400 mb-2">
            Sinopsis
          </h2>
          <p className="text-slate-300 leading-relaxed">{buku.sinopsis}</p>
        </div>

        <Link
          href="/katalog"
          className="inline-block mt-6 bg-slate-800 hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition"
        >
          ← Kembali ke Katalog
        </Link>
      </div>
    </article>
  );
}