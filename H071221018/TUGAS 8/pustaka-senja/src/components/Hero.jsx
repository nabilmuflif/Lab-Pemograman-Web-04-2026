import Link from "next/link";

function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-amber-950 via-amber-900 to-orange-800 px-5 py-20 text-white">

      <div className="relative z-10 mx-auto max-w-7xl">

        <span className="rounded-full border border-amber-300/40 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-amber-200">
          RUANG BACA KOMUNITAS
        </span>

        <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          Selamat Datang di
          <span className="block text-amber-300">
            {nama}
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-amber-100 md:text-lg">
          {slogan}
        </p>

        <div className="mt-6 space-y-2 text-sm text-amber-200">
          <p>📍 {lokasi}</p>
          <p>🕒 {jamBuka}</p>
        </div>

        <div className="mt-9 flex flex-wrap gap-4">

          <Link
            href="/katalog"
            className="rounded-xl bg-amber-300 px-6 py-3 font-bold text-amber-950 transition hover:bg-amber-200"
          >
            Jelajahi Katalog →
          </Link>

          <Link
            href="/usulan"
            className="rounded-xl border border-white/40 px-6 py-3 font-bold text-white transition hover:bg-white/10"
          >
            Usulkan Buku
          </Link>

        </div>

      </div>

      <div className="pointer-events-none absolute -right-10 top-10 text-[220px] opacity-10">
        📚
      </div>

    </section>
  );
}

export default Hero;