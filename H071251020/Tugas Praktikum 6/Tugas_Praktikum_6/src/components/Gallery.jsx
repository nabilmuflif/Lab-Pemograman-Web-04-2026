import React from 'react';
// Import gambar dari folder src/assets/gallery/
import foto4 from '../assets/gallery/desain_ui.png';
import foto3 from '../assets/gallery/oop.png';
import foto1 from '../assets/gallery/kasir.png';
import foto2 from '../assets/gallery/CLI.png';

const Gallery = () => {
  const galleries = [
    { id: 1, img: foto1, title: 'Proyek Kasir' },
    { id: 2, img: foto2, title: 'Proyek CLI' },
    { id: 3, img: foto3, title: 'Proyek OOP' },
    { id: 4, img: foto4, title: 'Proyek UI Design' }
  ];

  return (
    <section id="gallery" className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Galeri Proyek</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleries.map((foto) => (
            <div key={foto.id} className="group relative overflow-hidden rounded-lg shadow-md">
              <img 
                src={foto.img} 
                alt={foto.title} 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-semibold">{foto.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;