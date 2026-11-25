
"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarContent() {
  const pathname = usePathname();
  const [menuBuka, setMenuBuka] = useState(false);

  const menu = [
    { nama: "Beranda", href: "/" },
    { nama: "Katalog", href: "/katalog" },
    { nama: "Usulan Buku", href: "/usulan" },
  ];

  const menuActive = (href) => {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="relative z-50 border-b border-amber-700/40 bg-[#3B2418] text-amber-50 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide text-amber-100 transition hover:text-yellow-300"
        >
          📚 Pustaka Senja
        </Link>

        {/* Tombol Menu Mobile */}
        <button
          className="rounded-lg border border-amber-200/30 px-3 py-2 text-2xl text-amber-100 transition hover:bg-amber-100/10 md:hidden"
          onClick={() => setMenuBuka(!menuBuka)}
          aria-label={menuBuka ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={menuBuka}
        >
          {menuBuka ? "✕" : "☰"}
        </button>

        {/* Navigasi */}
        <div
          className={`
            ${menuBuka ? "flex" : "hidden"}
            absolute left-0 top-full z-50 w-full
            flex-col gap-2 border-t border-amber-700/40
            bg-[#3B2418] p-5 shadow-xl
            md:static md:flex md:w-auto md:flex-row
            md:items-center md:gap-8 md:border-0
            md:bg-transparent md:p-0 md:shadow-none
          `}
        >
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuBuka(false)}
              aria-current={menuActive(item.href) ? "page" : undefined}
              className={`
                rounded-lg px-4 py-2 text-sm font-semibold
                transition-all duration-200
                ${
                  menuActive(item.href)
                    ? "bg-amber-100 text-[#3B2418] shadow-sm"
                    : "text-amber-50 hover:bg-amber-100/10 hover:text-yellow-300"
                }
              `}
            >
              {item.nama}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}

function Navbar() {
  return (
    <Suspense
      fallback={
        <div className="h-16 bg-[#3B2418]" />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}

export default Navbar;
