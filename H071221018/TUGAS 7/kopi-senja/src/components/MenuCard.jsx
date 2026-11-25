import { useState } from "react";

function MenuCard({ menu, onTambah }) {
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-coffee-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-coffee-100 to-coffee-200">
        <span className="text-6xl">
          {menu.kategori === "Kopi"
            ? "☕"
            : menu.kategori === "Non-Kopi"
            ? "🥤"
            : "🍽️"}
        </span>
      </div>

      <div className="p-5">

        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-coffee-100 px-3 py-1 text-xs font-semibold text-coffee-700">
            {menu.kategori}
          </span>

          {menu.tersedia ? (
            <span className="text-xs font-semibold text-green-600">
              ● Tersedia
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-500">
              ● Habis
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-coffee-900">
          {menu.nama}
        </h3>

        <p className="mt-1 text-lg font-bold text-coffee-600">
          {formatRupiah(menu.harga)}
        </p>

        {detailTerbuka && (
          <div className="mt-3 rounded-lg bg-coffee-50 p-3 text-sm text-gray-600">
            {menu.deskripsi}
          </div>
        )}

        <div className="mt-4 flex gap-2">

          <button
            onClick={() => setDetailTerbuka(!detailTerbuka)}
            className="flex-1 rounded-lg border border-coffee-600 px-3 py-2 text-sm font-semibold text-coffee-700 transition hover:bg-coffee-50"
          >
            {detailTerbuka ? "Tutup Detail" : "Detail"}
          </button>

          <button
            onClick={() => onTambah(menu)}
            disabled={!menu.tersedia}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
              menu.tersedia
                ? "bg-coffee-700 hover:bg-coffee-800"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            {menu.tersedia ? "+ Tambah" : "Habis"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default MenuCard;