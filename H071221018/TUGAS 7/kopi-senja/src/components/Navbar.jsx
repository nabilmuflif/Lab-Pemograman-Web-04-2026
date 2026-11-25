
import { useState } from "react";

function Navbar({ jumlahPesanan, totalHarga }) {
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const tutupMenu = () => {
    setMenuTerbuka(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-coffee-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-5">

        {/* NAVBAR UTAMA */}
        <div className="flex min-h-20 items-center justify-between">

          {/* LOGO */}
          <a
            href="#beranda"
            onClick={tutupMenu}
            className="text-2xl font-bold tracking-wide"
          >
            ☕ Kopi Senja
          </a>

          {/* MENU DESKTOP */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#beranda"
              className="transition hover:text-amber-300"
            >
              Beranda
            </a>

            <a
              href="#menu"
              className="transition hover:text-amber-300"
            >
              Menu
            </a>

            <a
              href="#pesanan"
              className="transition hover:text-amber-300"
            >
              Pesanan
            </a>

            {/* RINGKASAN KERANJANG */}
            <div className="rounded-xl bg-white/10 px-4 py-2">
              <p className="text-xs text-coffee-200">
                Keranjang
              </p>

              <p className="font-bold">
                {jumlahPesanan} item
              </p>

              <p className="text-sm text-amber-300">
                {formatRupiah(totalHarga)}
              </p>
            </div>
          </div>

          {/* TOMBOL MOBILE */}
          <div className="flex items-center gap-3 md:hidden">

            {/* TOTAL PESANAN MOBILE */}
            <div className="text-right">
              <p className="text-xs text-coffee-200">
                {jumlahPesanan} item
              </p>

              <p className="text-sm font-bold text-amber-300">
                {formatRupiah(totalHarga)}
              </p>
            </div>

            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => setMenuTerbuka(!menuTerbuka)}
              aria-label={menuTerbuka ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={menuTerbuka}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-2xl transition hover:bg-white/10"
            >
              {menuTerbuka ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* MENU MOBILE */}
        {menuTerbuka && (
          <div className="border-t border-white/20 py-4 md:hidden">

            <div className="flex flex-col gap-2">

              <a
                href="#beranda"
                onClick={tutupMenu}
                className="rounded-lg px-4 py-3 transition hover:bg-white/10"
              >
                🏠 Beranda
              </a>

              <a
                href="#menu"
                onClick={tutupMenu}
                className="rounded-lg px-4 py-3 transition hover:bg-white/10"
              >
                ☕ Menu
              </a>

              <a
                href="#pesanan"
                onClick={tutupMenu}
                className="rounded-lg px-4 py-3 transition hover:bg-white/10"
              >
                🛒 Pesanan
              </a>

            </div>

            {/* DETAIL KERANJANG MOBILE */}
            <div className="mt-4 rounded-xl bg-white/10 p-4">
              <p className="text-sm text-coffee-200">
                Ringkasan Keranjang
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm">
                  Total Item
                </span>

                <span className="font-bold">
                  {jumlahPesanan}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm">
                  Total Harga
                </span>

                <span className="font-bold text-amber-300">
                  {formatRupiah(totalHarga)}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
