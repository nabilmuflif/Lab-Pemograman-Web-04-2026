"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", alamat: "/" },
  { nama: "Katalog", alamat: "/katalog" },
  { nama: "Usulan Buku", alamat: "/usulan" },
];

function Navbar() {
  const pathname = usePathname();

  function cekMenuAktif(alamat) {
    if (alamat === "/") {
      return pathname === "/";
    }
    if (pathname === alamat) {
      return true;
    }
    if (pathname.startsWith(alamat + "/")) {
      return true;
    }
    return false;
  }

  return (
    <header className="bg-krem border-b border-beige-tua top-0 sticky z-1">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-cokelat"
        >
          Pustaka Senja
        </Link>

        <ul className="flex flex-wrap justify-center gap-2">
          {daftarMenu.map(function (menu) {
            const menuAktif = cekMenuAktif(menu.alamat);
            let kelasMenu = "";

            if (menuAktif) {
              kelasMenu =
                "block rounded-full bg-cokelat px-4 py-2 text-sm font-semibold text-krem";
            } else {
              kelasMenu =
                "block rounded-full px-4 py-2 text-sm font-medium text-cokelat-muda hover:bg-beige";
            }

            return (
              <li key={menu.alamat}>
                <Link href={menu.alamat} className={kelasMenu}>
                  {menu.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;