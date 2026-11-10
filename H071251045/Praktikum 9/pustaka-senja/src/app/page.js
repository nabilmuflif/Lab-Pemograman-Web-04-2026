import Link from "next/link";
import Hero from "@/components/Hero";
import { ambilStatistik } from "@/lib/buku";

// Statistik dibaca dari PostgreSQL pada setiap permintaan agar selalu terbaru.
export const dynamic = "force-dynamic";

async function HalamanBeranda() {
  const daftarMenu = [
  { nama: "Katalog", alamat: "/katalog" },
  { nama: "Usulan Buku", alamat: "/usulan" },
];
  const statistik = await ambilStatistik();

  const daftarStatistik = [
    { label: "Total Koleksi Buku", angka: statistik.total },
    { label: "Buku Tersedia", angka: statistik.tersedia },
    { label: "Buku Dipinjam", angka: statistik.dipinjam },
  ];

  return (
    <div>
      <Hero
        namaRuangBaca="Pustaka Senja"
        slogan="Sebuah platform baca membaca buku digital yang mantap."
        lokasi="Jl. Perintis Kemerdekaan, Makassar"
        
      />

      <section className="mx-auto max-w-6xl px-4 pb-16 mt-10">
        <h2 className="mb-6 text-center font-serif text-2xl font-bold text-cokelat">
          Statistik Koleksi
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {daftarStatistik.map(function (item) {
            return (
              <div
                key={item.label}
                className="rounded-2xl  p-6 text-center"
              >
                <p className="font-serif text-5xl font-bold ">
                  {item.angka}
                </p>
                <p className="mt-2 text-sm font-medium text-cokelat-muda">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        <ul className="flex flex-wrap justify-center gap-2 ">
          {daftarMenu.map(function (menu) {
            let kelasMenu = "block rounded-full bg-cokelat gap-3 px-6 py-4 text-sm font-semibold text-krem hover:bg-beige hover:text-cokelat";

            return (
              <li key={menu.alamat}>
                <Link href={menu.alamat} className={kelasMenu}>
                  {menu.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default HalamanBeranda;
