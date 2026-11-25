import { useState } from "react";

import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import RingkasanPesanan from "./components/RingkasanPesanan";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer";

function App() {

  // DATA MENU
  const [daftarMenu] = useState([
    {
      id: 1,
      nama: "Kopi Susu",
      kategori: "Kopi",
      harga: 18000,
      tersedia: true,
      deskripsi: "Espresso dengan susu segar dan gula aren.",
    },
    {
      id: 2,
      nama: "Americano",
      kategori: "Kopi",
      harga: 15000,
      tersedia: true,
      deskripsi: "Espresso dengan air panas, rasa kuat dan bersih.",
    },
    {
      id: 3,
      nama: "Cappuccino",
      kategori: "Kopi",
      harga: 22000,
      tersedia: true,
      deskripsi: "Espresso, susu panas, dan busa susu tebal.",
    },
    {
      id: 4,
      nama: "Matcha Latte",
      kategori: "Non-Kopi",
      harga: 24000,
      tersedia: true,
      deskripsi: "Teh hijau matcha dengan susu.",
    },
    {
      id: 5,
      nama: "Teh Tarik",
      kategori: "Non-Kopi",
      harga: 14000,
      tersedia: false,
      deskripsi: "Teh susu yang ditarik hingga berbusa.",
    },
    {
      id: 6,
      nama: "Cokelat Panas",
      kategori: "Non-Kopi",
      harga: 20000,
      tersedia: true,
      deskripsi: "Cokelat pekat dengan susu hangat.",
    },
    {
      id: 7,
      nama: "Roti Bakar",
      kategori: "Makanan",
      harga: 16000,
      tersedia: true,
      deskripsi: "Roti tebal dengan selai cokelat dan keju.",
    },
    {
      id: 8,
      nama: "Pisang Goreng",
      kategori: "Makanan",
      harga: 12000,
      tersedia: false,
      deskripsi: "Pisang goreng renyah dengan taburan keju.",
    },
    {
      id: 9,
      nama: "Nasi Goreng",
      kategori: "Makanan",
      harga: 25000,
      tersedia: true,
      deskripsi: "Nasi goreng kampung dengan telur mata sapi.",
    },
  ]);

  // STATE KATEGORI
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  // STATE KERANJANG
  const [pesanan, setPesanan] = useState({});

  // STATE UCAPAN SUKSES
  const [pesanSukses, setPesanSukses] = useState("");

  // FILTER MENU BERDASARKAN KATEGORI
  const menuTampil =
    kategoriAktif === "Semua"
      ? daftarMenu
      : daftarMenu.filter(
          (menu) => menu.kategori === kategoriAktif
        );

  // MENGHITUNG JUMLAH SELURUH PESANAN
  const jumlahPesanan = Object.values(pesanan).reduce(
    (total, jumlah) => total + jumlah,
    0
  );

  // MENGHITUNG TOTAL HARGA
  const totalHarga = daftarMenu.reduce(
    (total, menu) =>
      total + menu.harga * (pesanan[menu.id] || 0),
    0
  );

  // MENAMBAHKAN MENU
  const handleTambah = (menu) => {
    if (!menu.tersedia) return;

    setPesanan((pesananSebelumnya) => ({
      ...pesananSebelumnya,
      [menu.id]: (pesananSebelumnya[menu.id] || 0) + 1,
    }));

    setPesanSukses("");
  };

  // MENGURANGI MENU
  const handleKurang = (id) => {
    setPesanan((pesananSebelumnya) => {
      const pesananBaru = { ...pesananSebelumnya };

      if (pesananBaru[id] > 1) {
        pesananBaru[id] -= 1;
      } else {
        delete pesananBaru[id];
      }

      return pesananBaru;
    });

    setPesanSukses("");
  };

  // MENGIRIM PESANAN
  const handleKirim = (dataPelanggan) => {
  if (jumlahPesanan === 0) {
    return {
      berhasil: false,
      pesan: "Silakan pilih menu terlebih dahulu!",
    };
  }

  const menuTidakTersedia = daftarMenu.some(
    (menu) => pesanan[menu.id] > 0 && !menu.tersedia
  );

  if (menuTidakTersedia) {
    return {
      berhasil: false,
      pesan: "Terdapat menu yang sedang habis.",
    };
  }

  setPesanSukses(
    `Terima kasih ${dataPelanggan.nama}! Pesanan untuk meja ${dataPelanggan.nomorMeja} berhasil dikirim.`
  );

  setPesanan({});

  return {
    berhasil: true,
    pesan: "",
  };
};

  return (
    <div className="min-h-screen bg-coffee-50">

      {/* NAVBAR */}
      <Navbar
        jumlahPesanan={jumlahPesanan}
        totalHarga={totalHarga}
      />

      {/* HERO */}
      <section
        id="beranda"
        className="bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-600 px-5 py-20 text-center text-white"
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Welcome to
        </p>

        <h1 className="text-4xl font-extrabold md:text-6xl">
          Kedai Kopi Senja
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-coffee-100 md:text-lg">
          Nikmati setiap momen dengan secangkir kopi terbaik.
          Pesan makanan dan minuman favoritmu dengan mudah.
        </p>

        <a
          href="#menu"
          className="mt-8 inline-block rounded-xl bg-amber-400 px-7 py-3 font-bold text-coffee-900 transition hover:bg-amber-300"
        >
          Lihat Menu Kami ↓
        </a>
      </section>

      {/* NOTIFIKASI SUKSES */}
      {pesanSukses && (
        <div className="mx-auto mt-8 max-w-7xl px-5">
          <div
            role="status"
            className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 shadow-sm"
          >
            <h2 className="text-lg font-bold">
              🎉 Pesanan Berhasil!
            </h2>

            <p className="mt-2 text-sm leading-relaxed">
              {pesanSukses}
            </p>
          </div>
        </div>
      )}

      {/* DAFTAR MENU */}
      <main className="mx-auto max-w-7xl px-5 py-12">

        <section id="menu">

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-coffee-500">
              Our Menu
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-coffee-900">
              Pilih Menu Favoritmu
            </h2>

            <p className="mt-2 text-gray-500">
              Tersedia berbagai pilihan kopi, minuman, dan makanan.
            </p>
          </div>

          {/* FILTER KATEGORI */}
          <div className="mb-8 flex flex-wrap gap-3">

            {["Semua", "Kopi", "Non-Kopi", "Makanan"].map(
              (kategori) => (
                <button
                  key={kategori}
                  onClick={() => setKategoriAktif(kategori)}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                    kategoriAktif === kategori
                      ? "bg-coffee-800 text-white shadow-md"
                      : "border border-coffee-200 bg-white text-coffee-800 hover:bg-coffee-100"
                  }`}
                >
                  {kategori}
                </button>
              )
            )}

          </div>

          {/* KOMPONEN MENU */}
          <MenuList
            daftarMenu={menuTampil}
            onTambah={handleTambah}
          />

        </section>

        {/* RINGKASAN DAN FORM */}
        <section
          id="pesanan"
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >

          <RingkasanPesanan
            daftarMenu={daftarMenu}
            pesanan={pesanan}
            totalHarga={totalHarga}
            onKurang={handleKurang}
            onTambah={handleTambah}
          />

          <FormPesan onKirim={handleKirim} />

        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;