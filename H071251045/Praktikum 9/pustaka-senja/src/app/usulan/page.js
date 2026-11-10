"use client";

import { useState } from "react";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

function HalamanUsulan() {
  const [namaPengusul, setNamaPengusul] = useState("");
  const [judulBuku, setJudulBuku] = useState("");
  const [kategoriBuku, setKategoriBuku] = useState("");
  const [alasan, setAlasan] = useState("");
  const [pesanError, setPesanError] = useState("");
  const [pesanSukses, setPesanSukses] = useState("");
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  const kelasInput =
    "mt-1 w-full rounded-lg border border-beige-tua bg-white px-4 py-2 text-cokelat focus:border-sage-tua focus:outline-none";

  function handleSubmit(e) {
    e.preventDefault();

    const namaKosong = namaPengusul.trim() === "";
    const judulKosong = judulBuku.trim() === "";
    const kategoriKosong = kategoriBuku.trim() === "";
    const alasanKosong = alasan.trim() === "";

    if (namaKosong || judulKosong || kategoriKosong || alasanKosong) {
      setPesanSukses("");
      setPesanError("Semua kolom wajib diisi sebelum usulan dikirim.");
      return;
    }

    const usulanBaru = {
      id: daftarUsulan.length + 1,
      nama: namaPengusul.trim(),
      judul: judulBuku.trim(),
      kategori: kategoriBuku.trim(),
      alasan: alasan.trim(),
    };

    setDaftarUsulan([usulanBaru].concat(daftarUsulan));

    setNamaPengusul("");
    setJudulBuku("");
    setKategoriBuku("");
    setAlasan("");

    setPesanError("");
    setPesanSukses("Terima kasih! Usulan buku kamu berhasil dikirim.");
  }

  let kotakPesan = null;

  if (pesanError !== "") {
    kotakPesan = (
      <p className="rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
        {pesanError}
      </p>
    );
  } else if (pesanSukses !== "") {
    kotakPesan = (
      <p className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
        {pesanSukses}
      </p>
    );
  }

  let isiDaftarUsulan = null;

  if (daftarUsulan.length === 0) {
    isiDaftarUsulan = (
      <p className="text-cokelat-muda">Belum ada usulan yang dikirim.</p>
    );
  } else {
    isiDaftarUsulan = (
      <ul className="space-y-3">
        {daftarUsulan.map(function (usulan) {
          return (
            <li
              key={usulan.id}
              className="rounded-xl border border-beige-tua bg-white p-4"
            >
              <p className="font-serif text-lg font-bold text-cokelat">
                {usulan.judul}
              </p>
              <p className="text-sm text-sage-tua">{usulan.kategori}</p>
              <p className="mt-2 text-sm text-cokelat-muda">
                Diusulkan oleh <strong>{usulan.nama}</strong>
              </p>
              <p className="mt-1 text-sm text-cokelat-muda">{usulan.alasan}</p>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-cokelat sm:text-4xl">
        Usulan Buku
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-beige-tua bg-beige/40 p-6"
      >
        <div>
          <label htmlFor="namaPengusul" className="text-sm font-medium">
            Nama Pengusul
          </label>
          <input
          placeholder="Masukkan nama kamu"
            id="namaPengusul"
            type="text"
            value={namaPengusul}
            onChange={function (e) {
              setNamaPengusul(e.target.value);
            }}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="judulBuku" className="text-sm font-medium">
            Judul Buku yang Diusulkan
          </label>
          <input
            placeholder="Masukkan judul buku"
            id="judulBuku"
            type="text"
            value={judulBuku}
            onChange={function (e) {
              setJudulBuku(e.target.value);
            }}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="kategoriBuku" className="text-sm font-medium">
            Kategori Buku
          </label>
          <select
            id="kategoriBuku"
            value={kategoriBuku}
            onChange={function (e) {
              setKategoriBuku(e.target.value);
            }}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {daftarKategori.map(function (kategori) {
              return (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="text-sm font-medium">
            Alasan Usulan
          </label>
          <textarea
            placeholder="Jelaskan alasan kamu mengusulkan buku ini"
            id="alasan"
            rows="4"
            value={alasan}
            onChange={function (e) {
              setAlasan(e.target.value);
            }}
            className={kelasInput}
          />
        </div>

        {kotakPesan}

        <button
          type="submit"
          className="w-full rounded-full bg-cokelat px-6 py-3 font-semibold text-krem hover:bg-cokelat-muda sm:w-auto"
        >
          Kirim Usulan
        </button>
      </form>

      <section className="mt-12">
        <h2 className="mb-4 font-serif text-2xl font-bold text-cokelat">
          Daftar Usulan Terbaru
        </h2>
        {isiDaftarUsulan}
      </section>
    </div>
  );
}

export default HalamanUsulan;