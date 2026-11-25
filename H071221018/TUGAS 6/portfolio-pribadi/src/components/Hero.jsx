const Hero = () => {
  const handleClick = () => {
    console.log("Terima kasih telah mengunjungi portfolio saya!");
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-slate-950 flex items-center pt-28 pb-10 px-6"
    >
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-red-500 font-semibold tracking-widest mb-4">
            HELLO, WELCOME TO MY PORTFOLIO
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Halo, Saya
            <span className="block text-red-500">
              Waliuddin
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-slate-300 mt-5">
            Mahasiswa Sistem Informasi
          </h2>

          <p className="text-slate-400 leading-relaxed mt-6 max-w-lg">
            Saya adalah pribadi yang memiliki semangat untuk terus belajar,
            berkembang, dan mengeksplorasi dunia teknologi informasi.
            Saya tertarik pada pengembangan website, desain, dan teknologi digital.
          </p>

          <button
            onClick={handleClick}
            className="mt-5 px-5 py-3 rounded-full bg-red-500 text-slate-950 font-bold hover:bg-red-400 hover:scale-105 transition duration-300"
          >
            Explore My Profile
          </button>
        </div>

        <div className="flex justify-center">
          <div className="p-3 rounded-3xl border border-red-500/50 bg-slate-900 shadow-2xl shadow-red-500/10">
            <img
              src="public/profile.jpeg"
              alt="Foto profil pribadi"
              className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
