import React from 'react';

const Hero = () => {
  const handleSapa = () => {
    console.log('Halo! Selamat datang di website portofolio saya.');
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Halo, Saya Glenn Robean Runtunuwu!
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Seorang mahasiswa Sistem Informasi yang sedang mempelajari 
            pengembangan web dan desain antarmuka pengguna.
          </p>
          <button 
            onClick={handleSapa}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Sapa Saya di Console
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* Foto dari folder public/ */}
          <img 
            src="/profil.jpg" 
            alt="Foto Profil" 
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-8 border-white shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;