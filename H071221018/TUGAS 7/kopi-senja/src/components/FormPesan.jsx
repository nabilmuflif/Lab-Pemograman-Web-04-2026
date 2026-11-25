import { useState } from "react";

function FormPesan({ onKirim }) {
  const [nama, setNama] = useState("");
  const [nomorMeja, setNomorMeja] = useState("");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (event) => {
  event.preventDefault();

  if (!nama.trim()) {
    setPesan("Nama pelanggan wajib diisi.");
    return;
  }

  if (!nomorMeja.trim()) {
    setPesan("Nomor meja wajib diisi.");
    return;
  }

  if (!/^[1-9]\d*$/.test(nomorMeja)) {
    setPesan("Nomor meja harus berupa angka positif.");
    return;
  }

  const dataPesanan = {
    nama: nama.trim(),
    nomorMeja: nomorMeja.trim(),
  };

  // Menampilkan data pemesan di Console
  console.log("Pesanan berhasil dikirim!");
  console.log("Data Pemesan:", dataPesanan);

  const hasil = onKirim(dataPesanan);

  if (hasil.berhasil) {
    setNama("");
    setNomorMeja("");
    setPesan("");
  } else {
    setPesan(hasil.pesan);
  }
};

  return (
    <div className="rounded-2xl border border-coffee-100 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold text-coffee-900">
        📝 Data Pemesan
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Lengkapi data sebelum mengirim pesanan.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">

        <div>
          <label
            htmlFor="nama"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Nama Pelanggan
          </label>

          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(event) => setNama(event.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-coffee-600 focus:ring-2 focus:ring-coffee-100"
          />
        </div>

        <div>
          <label
            htmlFor="nomorMeja"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Nomor Meja
          </label>

          <input
            id="nomorMeja"
            type="number"
            min="1"
            step="1"
            value={nomorMeja}
            onChange={(event) => setNomorMeja(event.target.value)}
            placeholder="Contoh: 5"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-coffee-600 focus:ring-2 focus:ring-coffee-100"
          />
        </div>

        {pesan && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600"
          >
            {pesan}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-coffee-700 py-3 font-bold text-white transition hover:bg-coffee-800"
        >
          Kirim Pesanan →
        </button>

      </form>
    </div>
  );
}

export default FormPesan;