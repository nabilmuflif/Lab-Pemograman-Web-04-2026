"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { hapusBuku } from "@/app/katalog/actions";

// Client Component: hanya mengurus interaksi browser (window.confirm).
// Penghapusan sebenarnya dijalankan oleh Server Action hapusBuku di server.
function TombolHapus({ id, judul, setelahHapus }) {
  const router = useRouter();
  const [sedangMenghapus, mulaiTransisi] = useTransition();

  function handleHapus() {
    const setuju = window.confirm(
      "Hapus buku \"" + judul + "\" dari katalog? Tindakan ini tidak dapat dibatalkan."
    );

    // Jika dibatalkan, tidak ada yang dikirim ke server dan data tetap aman.
    if (!setuju) {
      return;
    }

    mulaiTransisi(async function () {
      const hasil = await hapusBuku(id);

      if (!hasil.sukses) {
        window.alert(hasil.pesan);
        return;
      }

      if (setelahHapus) {
        router.push(setelahHapus);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleHapus}
      disabled={sedangMenghapus}
      className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {sedangMenghapus ? "Menghapus..." : "Hapus"}
    </button>
  );
}

export default TombolHapus;
