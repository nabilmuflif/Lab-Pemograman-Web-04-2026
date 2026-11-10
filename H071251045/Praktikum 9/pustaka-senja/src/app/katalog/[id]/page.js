import Link from "next/link";
import { notFound } from "next/navigation";
import TombolHapus from "@/components/TombolHapus";
import { ambilBukuById, parseId } from "@/lib/buku";

export const dynamic = "force-dynamic";

async function HalamanDetailBuku({ params }) {
  const { id } = await params;
  const idAngka = parseId(id);

  // ID tidak valid (misalnya "abc") -> halaman 404
  if (idAngka === null) {
    notFound();
  }

  // Query SELECT berparameter ke PostgreSQL
  const buku = await ambilBukuById(idAngka);

  // Buku tidak ada di database -> halaman 404
  if (!buku) {
    notFound();
  }

  let teksStatus = "";
  let kelasStatus = "";

  if (buku.tersedia === true) {
    teksStatus = "Tersedia";
    kelasStatus =
      "inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800";
  } else if (buku.tersedia === false) {
    teksStatus = "Sedang Dipinjam";
    kelasStatus =
      "inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800";
  } else {
    teksStatus = "Belum Dikonfirmasi";
    kelasStatus =
      "inline-block rounded-full bg-stone-200 px-3 py-1 text-sm font-semibold text-stone-700";
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
            href="/katalog"
           className="mt-2 font-serif text-xl font-bold text-cokelat-muda hover:underline"
          >
            -- Kembali ke Katalog
          </Link>

      <article className="mt-6 rounded-2xl border border-beige-tua bg-white p-6 shadow-sm sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-sage-tua">
          {buku.kategori}
        </span>

        <h1 className="mt-2 font-serif text-3xl font-bold text-cokelat sm:text-4xl">
          {buku.judul}
        </h1>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase text-cokelat-muda">Penulis</dt>
            <dd className="mt-1 font-medium text-cokelat">{buku.penulis}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-cokelat-muda">
              Tahun Terbit
            </dt>
            <dd className="mt-1 font-medium text-cokelat">{buku.tahun}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-cokelat-muda">Status</dt>
            <dd className="mt-1">
              <span className={kelasStatus}>{teksStatus}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <h2 className="font-serif text-xl font-bold text-cokelat">
            Sinopsis
          </h2>
          <p className="mt-2 leading-relaxed text-cokelat-muda">
            {buku.sinopsis}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          

          <Link
            href={`/katalog/${buku.id}/edit`}
            className="inline-block rounded-full border border-sage-tua px-6 py-3 font-semibold text-sage-tua hover:bg-sage-muda"
          >
            Edit
          </Link>

          <TombolHapus
            id={buku.id}
            judul={buku.judul}
            setelahHapus="/katalog"
          />
        </div>
      </article>
    </div>
  );
}

export default HalamanDetailBuku;