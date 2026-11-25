const Footer = () => {
  const tahun = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-slate-950 border-t border-slate-800 py-8 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-xl font-bold text-white">
          My<span className="text-red-500">Portfolio.</span>
        </h2>

        <p className="text-slate-400 text-sm mt-3">
          Terus belajar, berkembang, dan menciptakan sesuatu yang bermanfaat.
        </p>

        <div className="border-t border-slate-800 mt-6 pt-6">
          <p className="text-slate-500 text-sm">
            © {tahun} Waliuddin. Pemenuhan Tugas Praktikum 6.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
