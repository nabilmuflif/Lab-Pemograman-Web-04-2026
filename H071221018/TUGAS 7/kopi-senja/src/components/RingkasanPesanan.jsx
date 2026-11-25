function RingkasanPesanan({
  daftarMenu,
  pesanan,
  totalHarga,
  onKurang,
  onTambah,
}) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const menuDipesan = daftarMenu.filter(
    (menu) => pesanan[menu.id]
  );

  return (
    <div className="rounded-2xl border border-coffee-100 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-coffee-900">
        🛒 Ringkasan Pesanan
      </h2>

      <div className="mt-5 space-y-4">

        {menuDipesan.length > 0 ? (
          menuDipesan.map((menu) => (
            <div
              key={menu.id}
              className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4"
            >
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-800">
                  {menu.nama}
                </h3>

                <p className="text-sm text-gray-500">
                  {formatRupiah(menu.harga)} × {pesanan[menu.id]}
                </p>

                <p className="mt-1 text-sm font-bold text-coffee-700">
                  {formatRupiah(menu.harga * pesanan[menu.id])}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onKurang(menu.id)}
                  className="h-8 w-8 rounded-lg bg-gray-100 font-bold hover:bg-gray-200"
                  aria-label={`Kurangi ${menu.nama}`}
                >
                  −
                </button>

                <span className="w-5 text-center font-bold">
                  {pesanan[menu.id]}
                </span>

                <button
                  onClick={() => onTambah(menu)}
                  disabled={!menu.tersedia}
                  className="h-8 w-8 rounded-lg bg-coffee-700 font-bold text-white hover:bg-coffee-800 disabled:bg-gray-300"
                  aria-label={`Tambah ${menu.nama}`}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-4xl">☕</p>
            <p className="mt-3 text-sm text-gray-500">
              Belum ada pesanan.
            </p>
            <p className="text-xs text-gray-400">
              Silakan pilih menu terlebih dahulu.
            </p>
          </div>
        )}

      </div>

      <div className="mt-5 border-t-2 border-dashed border-coffee-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-600">
            Total Pembayaran
          </span>

          <span className="text-xl font-bold text-coffee-800">
            {formatRupiah(totalHarga)}
          </span>
        </div>
      </div>

    </div>
  );
}

export default RingkasanPesanan;