import Link from "next/link";

import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function Home() {

  // MENGHITUNG STATISTIK KOLEKSI
  const totalBuku = dataBuku.length;

  const bukuTersedia = dataBuku.filter(
    (buku) => buku.tersedia
  ).length;

  const bukuDipinjam = dataBuku.filter(
    (buku) => !buku.tersedia
  ).length;

  const statistik = [
    {
      judul: "Total Koleksi Buku",
      jumlah: totalBuku,
      icon: "📚",
      warna: "bg-amber-100 text-amber-900",
    },
    {
      judul: "Buku Tersedia",
      jumlah: bukuTersedia,
      icon: "✅",
      warna: "bg-green-100 text-green-800",
    },
    {
      judul: "Buku Dipinjam",
      jumlah: bukuDipinjam,
      icon: "📖",
      warna: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div>

      {/* HERO */}
      <Hero
        nama="Pustaka Senja"
        slogan="Temukan inspirasi, perluas wawasan, dan nikmati pengalaman membaca dalam suasana yang nyaman dan penuh cerita."
        lokasi="Dekat kawasan kampus"
        jamBuka="Senin - Sabtu, 09.00 - 20.00 WITA"
      />

      {/* STATISTIK */}
      <section className="mx-auto max-w-7xl px-5 py-16">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">
            Koleksi Kami
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-amber-950">
            Ruang untuk Setiap Cerita
          </h2>

          <p className="mt-3 text-gray-500">
            Temukan berbagai koleksi menarik di Pustaka Senja.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">

          {statistik.map((item) => (
            <div
              key={item.judul}
              className="rounded-2xl border border-amber-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-4 font-semibold text-gray-600">
                {item.judul}
              </h3>

              <p className="mt-2 text-4xl font-extrabold text-amber-900">
                {item.jumlah}
              </p>

              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-bold ${item.warna}`}>
                Koleksi Buku
              </span>
            </div>
          ))}

        </div>

      </section>

      {/* TENTANG */}
      <section className="bg-white px-5 py-16">

        <div className="mx-auto max-w-4xl text-center">

          <span className="text-4xl">☕</span>

          <h2 className="mt-4 text-3xl font-extrabold text-amber-950">
            Lebih dari Sekadar Perpustakaan
          </h2>

          <p className="mt-5 leading-relaxed text-gray-600">
            Pustaka Senja hadir sebagai ruang baca komunitas yang
            memberikan kesempatan bagi siapa saja untuk belajar,
            membaca, berdiskusi, dan berbagi pengetahuan.
            Kami percaya bahwa setiap buku memiliki cerita
            dan setiap cerita memiliki makna.
          </p>

          <Link
            href="/katalog"
            className="mt-7 inline-block rounded-xl bg-amber-800 px-7 py-3 font-bold text-white transition hover:bg-amber-950"
          >
            Lihat Semua Buku
          </Link>

        </div>

      </section>

    </div>
  );
}