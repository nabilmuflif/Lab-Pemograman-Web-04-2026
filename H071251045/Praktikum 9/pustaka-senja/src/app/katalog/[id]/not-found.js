import Link from "next/link";

// Ditampilkan (dengan status HTTP 404) saat id tidak valid atau buku tidak ada,
// baik di halaman detail maupun halaman edit.
function BukuTidakDitemukan() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-serif text-3xl font-bold text-cokelat">
        Buku Tidak Ditemukan
      </h1>
      <p className="mt-3 text-cokelat-muda">
        Buku yang kamu cari tidak ada di katalog Pustaka Senja.
      </p>
      <Link
        href="/katalog"
        className="mt-6 inline-block rounded-full bg-cokelat px-6 py-3 font-semibold text-krem hover:bg-cokelat-muda"
      >
        Kembali ke Katalog
      </Link>
    </div>
  );
}

export default BukuTidakDitemukan;
