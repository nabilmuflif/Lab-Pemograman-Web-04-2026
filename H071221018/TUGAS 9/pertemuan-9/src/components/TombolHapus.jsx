"use client";

import { hapusProduk } from "@/app/produk/action";

export default function TombolHapus({ id }) {
    function konfirmasiHapus(event) {
        const yakin = window.confirm(
            "Apakah Anda yakin ingin menghapus produk ini?"
        );

        if (!yakin) {
            event.preventDefault();
        }
    }

    return (
        <form action={hapusProduk} onSubmit={konfirmasiHapus}>
            <input
                type="hidden"
                name="id"
                value={id}
            />

            <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                Hapus
            </button>
        </form>
    );
}