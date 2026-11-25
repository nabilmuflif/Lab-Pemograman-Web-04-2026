"use client";

import { useState } from "react";

export default function UsulanPage() {

  // STATE FORM
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");

  // STATE PESAN
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState("");

  // STATE DAFTAR USULAN
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  // SUBMIT FORM
  const handleSubmit = (event) => {
    event.preventDefault();

    // VALIDASI
    if (
      !nama.trim() ||
      !judul.trim() ||
      !kategori.trim() ||
      !alasan.trim()
    ) {
      setJenisPesan("error");
      setPesan("Semua kolom wajib diisi sebelum mengirim usulan.");
      return;
    }

    // DATA USULAN BARU
    const usulanBaru = {
      id: `${Date.now()}-${judul.trim()}`,
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori,
      alasan: alasan.trim(),
    };

    // SIMPAN KE STATE
    setDaftarUsulan((sebelumnya) => [
      ...sebelumnya,
      usulanBaru,
    ]);

    // NOTIFIKASI
    setJenisPesan("success");
    setPesan(
      `Terima kasih ${nama.trim()}! Usulan buku "${judul.trim()}" berhasil dikirim.`
    );

    // RESET FORM
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  };

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <section className="bg-linear-to-br from-amber-950 to-amber-800 px-5 py-14 text-center text-white">

        <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
          Berbagi Ide
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">
          Usulkan Buku
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-amber-100">
          Punya rekomendasi buku menarik?
          Bantu kami memperkaya koleksi Pustaka Senja.
        </p>

      </section>

      <main className="mx-auto max-w-4xl px-5 py-12">

        {/* FORM */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm md:p-9">

          <h2 className="text-2xl font-extrabold text-amber-950">
            Formulir Usulan Buku
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Isi informasi buku yang ingin Anda rekomendasikan.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* NAMA */}
            <div>
              <label
                htmlFor="nama"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Nama Pengusul
              </label>

              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* JUDUL */}
            <div>
              <label
                htmlFor="judul"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Judul Buku yang Diusulkan
              </label>

              <input
                id="judul"
                type="text"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
                placeholder="Masukkan judul buku"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label
                htmlFor="kategori"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Kategori Buku
              </label>

              <select
                id="kategori"
                value={kategori}
                onChange={(event) => setKategori(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
              >
                <option value="">
                  Pilih kategori
                </option>

                <option value="Teknologi">
                  Teknologi
                </option>

                <option value="Fiksi">
                  Fiksi
                </option>

                <option value="Pengembangan Diri">
                  Pengembangan Diri
                </option>
              </select>
            </div>

            {/* ALASAN */}
            <div>
              <label
                htmlFor="alasan"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Alasan Usulan
              </label>

              <textarea
                id="alasan"
                rows="5"
                value={alasan}
                onChange={(event) => setAlasan(event.target.value)}
                placeholder="Jelaskan mengapa buku ini layak menjadi koleksi..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* NOTIFIKASI */}
            {pesan && (
              <div
                role={jenisPesan === "error" ? "alert" : "status"}
                className={`rounded-xl p-4 text-sm font-semibold ${
                  jenisPesan === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {pesan}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-800 py-3.5 font-bold text-white transition hover:bg-amber-950"
            >
              Kirim Usulan Buku →
            </button>

          </form>

        </div>

        {/* DAFTAR USULAN */}
        {daftarUsulan.length > 0 && (
          <section className="mt-12">

            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-amber-950">
                Daftar Usulan Anda
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Berikut buku yang berhasil Anda usulkan.
              </p>
            </div>

            <div className="space-y-4">

              {daftarUsulan.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm"
                >

                  <div className="flex flex-wrap items-start justify-between gap-3">

                    <div>
                      <h3 className="text-lg font-bold text-amber-950">
                        {item.judul}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Diusulkan oleh: {item.nama}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                      {item.kategori}
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {item.alasan}
                  </p>

                </div>
              ))}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}