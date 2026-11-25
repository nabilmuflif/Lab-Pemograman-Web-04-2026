import Foto1 from "../assets/foto1.jpg";
import Foto2 from "../assets/foto2.jpg";
import Foto3 from "../assets/foto3.jpg";
import Foto4 from "../assets/foto4.jpeg";


const Gallery = () => {
  const photos = [
    {
      id: 1,
      title: "Personal Activity",
      image: Foto1,
      description: "Dokumentasi kegiatan pribadi",
    },
    {
      id: 2,
      title: "Organization",
      image: Foto2,
      description: "Pengalaman kegiatan organisasi",
    },
    {
      id: 3,
      title: "Teamwork",
      image: Foto3,
      description: "Pengalaman bekerja dalam tim",
    },
    {
      id: 4,
      title: "My Experience",
      image: Foto4,
      description: "Dokumentasi pengalaman berharga",
    },
  ];

  return (
    <section id="gallery" className="bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-red-500 font-semibold tracking-widest">
            MY MEMORIES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            My Gallery
          </h2>

          <div className="w-20 h-1 bg-red-500 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {photos.map((foto) => (
            <div
              key={foto.id}
              className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500 transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={foto.image}
                  alt={foto.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-white font-bold text-lg">
                  {foto.title}
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  {foto.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
