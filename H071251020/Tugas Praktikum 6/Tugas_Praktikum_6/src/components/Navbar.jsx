import React from 'react';

const Navbar = () => {
  const menus = ['Home', 'About', 'Skills', 'Gallery'];

  const handleClick = (menuName) => {
    console.log(`Navigasi ke: ${menuName}`);
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">My Portofolio</h1>
        <ul className="flex space-x-6">
          {menus.map((menu, index) => (
            <li key={index}>
              <button 
                onClick={() => handleClick(menu)} 
                className="hover:text-blue-400 transition-colors font-medium"
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;