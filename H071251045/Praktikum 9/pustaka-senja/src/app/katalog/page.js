import Link from "next/link";
import FilterKatalog from "@/components/FilterKatalog";
import { ambilSemuaBuku } from "@/lib/buku";

// Data dibaca dari PostgreSQL pada setiap permintaan agar selalu terbaru.
export const dynamic = "force-dynamic";

// Server Component: mengambil data dari PostgreSQL, lalu menyerahkannya ke
// FilterKatalog (Client Component) yang mengurus filter kategori.
async function HalamanKatalog() {
  const daftarBuku = await ambilSemuaBuku();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-cokelat sm:text-4xl">
          Katalog Buku
        </h1>

        <Link
          href="/katalog/tambah"
          className="rounded-full bg-cokelat px-6 py-3 text-sm font-semibold text-krem hover:bg-cokelat-muda"
        >
          Tambah Buku
        </Link>
      </div>

      <FilterKatalog daftarBuku={daftarBuku} />
    </div>
  );
}

export default HalamanKatalog;
