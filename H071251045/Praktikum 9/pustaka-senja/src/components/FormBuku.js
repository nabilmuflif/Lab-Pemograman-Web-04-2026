"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { DAFTAR_KATEGORI, PILIHAN_STATUS } from "@/lib/konstanta";

const kelasInput =
  "mt-1 w-full rounded-lg border border-beige-tua bg-white px-4 py-2 text-cokelat focus:border-sage-tua focus:outline-none";

const stateAwal = { errors: {}, pesan: "" };

// Formulir bersama untuk Tambah dan Edit buku.
// `action` adalah Server Action (tambahBuku / ubahBuku) yang dikirim dari halaman server.
function FormBuku({ action, nilaiAwal, idBuku, teksTombol, tautanBatal }) {
  const [state, formAction, sedangMengirim] = useActionState(action, stateAwal);

  // Input dikontrol state agar isian pengguna tidak hilang saat validasi server gagal.
  const [judul, setJudul] = useState(nilaiAwal.judul);
  const [penulis, setPenulis] = useState(nilaiAwal.penulis);
  const [kategori, setKategori] = useState(nilaiAwal.kategori);
  const [tahun, setTahun] = useState(nilaiAwal.tahun);
  const [status, setStatus] = useState(nilaiAwal.status);
  const [sinopsis, setSinopsis] = useState(nilaiAwal.sinopsis);

  function pesanError(namaField) {
    if (!state.errors[namaField]) {
      return null;
    }
    return (
      <p className="mt-1 text-sm text-red-700">{state.errors[namaField]}</p>
    );
  }

  let kotakPesan = null;

  if (state.pesan !== "") {
    kotakPesan = (
      <p className="rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">
        {state.pesan}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="mt-8 space-y-4 rounded-2xl border border-beige-tua bg-beige/40 p-6"
    >
      {idBuku ? <input type="hidden" name="id" value={idBuku} /> : null}

      <div>
        <label htmlFor="judul" className="text-sm font-medium">
          Judul Buku
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          placeholder="Masukkan judul buku"
          value={judul}
          onChange={function (e) {
            setJudul(e.target.value);
          }}
          className={kelasInput}
        />
        {pesanError("judul")}
      </div>

      <div>
        <label htmlFor="penulis" className="text-sm font-medium">
          Penulis
        </label>
        <input
          id="penulis"
          name="penulis"
          type="text"
          placeholder="Masukkan nama penulis"
          value={penulis}
          onChange={function (e) {
            setPenulis(e.target.value);
          }}
          className={kelasInput}
        />
        {pesanError("penulis")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kategori" className="text-sm font-medium">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={kategori}
            onChange={function (e) {
              setKategori(e.target.value);
            }}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {DAFTAR_KATEGORI.map(function (namaKategori) {
              return (
                <option key={namaKategori} value={namaKategori}>
                  {namaKategori}
                </option>
              );
            })}
          </select>
          {pesanError("kategori")}
        </div>

        <div>
          <label htmlFor="tahun" className="text-sm font-medium">
            Tahun Terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 2020"
            value={tahun}
            onChange={function (e) {
              setTahun(e.target.value);
            }}
            className={kelasInput}
          />
          {pesanError("tahun")}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="text-sm font-medium">
          Status Ketersediaan
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={function (e) {
            setStatus(e.target.value);
          }}
          className={kelasInput}
        >
          {PILIHAN_STATUS.map(function (pilihan) {
            return (
              <option key={pilihan.nilai} value={pilihan.nilai}>
                {pilihan.label}
              </option>
            );
          })}
        </select>
        {pesanError("status")}
      </div>

      <div>
        <label htmlFor="sinopsis" className="text-sm font-medium">
          Sinopsis
        </label>
        <textarea
          id="sinopsis"
          name="sinopsis"
          rows="5"
          placeholder="Tuliskan ringkasan isi buku"
          value={sinopsis}
          onChange={function (e) {
            setSinopsis(e.target.value);
          }}
          className={kelasInput}
        />
        {pesanError("sinopsis")}
      </div>

      {kotakPesan}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={sedangMengirim}
          className="w-full rounded-full bg-cokelat px-6 py-3 font-semibold text-krem hover:bg-cokelat-muda disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {sedangMengirim ? "Menyimpan..." : teksTombol}
        </button>

        <Link
          href={tautanBatal}
          className="w-full rounded-full border border-cokelat px-6 py-3 text-center font-semibold text-cokelat hover:bg-beige sm:w-auto"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}

export default FormBuku;
