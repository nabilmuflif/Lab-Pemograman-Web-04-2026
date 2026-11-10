import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";

function HalamanTambahBuku() {
  const nilaiAwal = {
    judul: "",
    penulis: "",
    kategori: "",
    tahun: "",
    status: "tersedia",
    sinopsis: "",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-cokelat sm:text-4xl">
        Tambah Buku
      </h1>
      <p className="mt-2 text-cokelat-muda">
        Isi data buku baru untuk ditambahkan ke koleksi Pustaka Senja.
      </p>

      <FormBuku
        action={tambahBuku}
        nilaiAwal={nilaiAwal}
        teksTombol="Simpan Buku"
        tautanBatal="/katalog"
      />
    </div>
  );
}

export default HalamanTambahBuku;
