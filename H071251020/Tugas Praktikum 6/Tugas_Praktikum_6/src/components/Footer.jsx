import React from 'react';

const Footer = () => {
  const tahun = 2026; 
  const nama = 'Glenn Robean Runtunuwu'; 

  return (
    <footer className="bg-slate-900 text-white text-center p-6 mt-auto">
      <p>&copy; {tahun} {nama}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;