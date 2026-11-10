function Hero({ namaRuangBaca, slogan, lokasi }) {
  return (
    <section className="bg-beige rounded-b-4xl " >
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">

        <h1 className="mt-4 font-serif text-4xl font-bold text-cokelat sm:text-6xl">
          {namaRuangBaca}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-cokelat-muda">
          {slogan}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-cokelat-muda sm:flex-row">
          
          <span className="rounded-full bg-krem px-4 py-2">{lokasi}</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
