const About = () => {
  const biodata = [
    { id: 1, label: "Nama", value: "Waliuddin" },
    { id: 2, label: "Pendidikan", value: "Sistem Informasi" },
    { id: 3, label: "Universitas", value: "Universitas Hasanuddin" },
    { id: 4, label: "Hobi", value: "Badminton" },
    { id: 5, label: "Email", value: "uddinwali234@gmail.com" },
  ];

  return (
    <section id="about" className="bg-slate-900 py-15 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold tracking-widest">
            GET TO KNOW ME
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            About Me
          </h2>

          <div className="w-20 h-1 bg-red-500 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h3 className="text-2xl font-bold text-white mb-5">
              Mengenal Saya Lebih Dekat
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Saya merupakan mahasiswa yang memiliki ketertarikan
              terhadap teknologi informasi dan pengembangan digital.
              Saya senang mempelajari hal-hal baru, bekerja sama
              dalam tim, serta mengembangkan kemampuan untuk
              menghadapi tantangan di masa depan.
            </p>
          </div>

          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">
              Personal Information
            </h3>

            <div className="space-y-5">
              {biodata.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b border-slate-800 pb-4"
                >
                  <span className="text-red-500 font-semibold">
                    {item.label}
                  </span>

                  <span className="text-slate-300">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
