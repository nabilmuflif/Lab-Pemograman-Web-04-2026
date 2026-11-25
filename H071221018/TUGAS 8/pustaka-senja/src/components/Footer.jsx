import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-amber-950 px-5 py-10 text-white">

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">

        <div>
          <h2 className="text-2xl font-bold">
            📚 Pustaka Senja
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-amber-200">
            Ruang baca komunitas untuk berbagi pengetahuan,
            menemukan cerita baru, dan mengembangkan kreativitas.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Navigasi</h3>

          <div className="mt-3 flex flex-col gap-2 text-sm text-amber-200">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>

            <Link href="/katalog" className="hover:text-white">
              Katalog Buku
            </Link>

            <Link href="/usulan" className="hover:text-white">
              Usulan Buku
            </Link>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-amber-800 pt-5 text-center text-xs text-amber-300">
        © 2026 Pustaka Senja. Semua Hak Dilindungi.
      </div>

    </footer>
  );
}

export default Footer;