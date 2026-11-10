import { notFound } from "next/navigation";
import FormBuku from "@/components/FormBuku";
import { ubahBuku } from "@/app/katalog/actions";
import { ambilBukuById, parseId } from "@/lib/buku";
import { booleanKeStatus } from "@/lib/konstanta";

export const dynamic = "force-dynamic";

async function HalamanEditBuku({ params }) {
  const { id } = await params;
  const idAngka = parseId(id);

  if (idAngka === null) {
    notFound();
  }

  const buku = await ambilBukuById(idAngka);

  if (!buku) {
    notFound();
  }

  const nilaiAwal = {
    judul: buku.judul,
    penulis: buku.penulis,
    kategori: buku.kategori,
    tahun: String(buku.tahun),
    status: booleanKeStatus(buku.tersedia),
    sinopsis: buku.sinopsis,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-cokelat sm:text-4xl">
        Edit Buku
      </h1>
      <p className="mt-2 text-cokelat-muda">
        Ubah informasi buku <strong>{buku.judul}</strong>.
      </p>

      <FormBuku
        action={ubahBuku}
        nilaiAwal={nilaiAwal}
        idBuku={buku.id}
        teksTombol="Simpan Perubahan"
        tautanBatal={"/katalog/" + buku.id}
      />
    </div>
  );
}

export default HalamanEditBuku;
