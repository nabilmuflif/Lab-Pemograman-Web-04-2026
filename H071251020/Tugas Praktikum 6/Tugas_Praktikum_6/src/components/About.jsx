import React from 'react';

const About = () => {
  // GANTI DATA DIRI ANDA (Pastikan id unik!)
  const dataDiri = [
    { id: 1, label: 'Nama Lengkap', value: 'Glenn Robean Runtunuwu' },
    { id: 2, label: 'NIM', value: 'H071251020' },
    { id: 3, label: 'Program Studi', value: 'Sistem Informasi' },
    { id: 4, label: 'Universitas', value: 'Universitas Hasanuddin' },
    { id: 5, label: 'Hobi', value: 'Seni Musik' }
  ];

  return (
    <section id="about" className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Tentang Saya</h2>
        <p className="text-center text-slate-600 mb-10 leading-relaxed">
          Saya adalah pribadi yang senang belajar hal-hal baru, terutama di bidang teknologi. 
          Saat ini saya sedang fokus mendalami pengembangan web modern menggunakan React dan Tailwind CSS.
        </p>
        
        <div className="bg-slate-50 p-8 rounded-xl shadow-sm">
          <ul className="space-y-4">
            {dataDiri.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row sm:items-center border-b border-slate-200 pb-3 last:border-0">
                <span className="font-semibold text-slate-700 sm:w-1/3">{item.label}</span>
                <span className="text-slate-600 sm:w-2/3 mt-1 sm:mt-0">: {item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;