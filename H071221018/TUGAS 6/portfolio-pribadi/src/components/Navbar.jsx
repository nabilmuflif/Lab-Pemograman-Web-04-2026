
const Navbar = () => {
  const menus = [
    { id: 1, label: "Home", link: "#home" },
    { id: 2, label: "About", link: "#about" },
    { id: 3, label: "Skills", link: "#skills" },
    { id: 4, label: "Gallery", link: "#gallery" },
  ];

  const handleMenuClick = (label) => {
    console.log("Menu dipilih:", label);

    // Menutup menu mobile setelah memilih menu
    document.getElementById("mobile-menu").classList.add("hidden");
  };

  const handleToggle = () => {
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenu.classList.toggle("hidden");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold text-white"
          >
            My<span className="text-red-500">Portfolio.</span>
          </a>

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {menus.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.link}
                  onClick={() => console.log(menu.label)}
                  className="text-slate-300 hover:text-red-500 transition duration-300"
                >
                  {menu.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact Desktop */}
          <a
            href="#contact"
            className="hidden md:block px-5 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-950 transition"
          >
            Contact Me
          </a>

          {/* Tombol Hamburger Mobile */}
          <button
            onClick={handleToggle}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-950 transition"
            aria-label="Buka atau tutup navigasi"
            aria-controls="mobile-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

        </div>

        {/* Menu Mobile */}
        <div
          id="mobile-menu"
          className="hidden md:hidden mt-5 pb-3 border-t border-slate-800"
        >
          <ul className="flex flex-col gap-2 pt-4">
            {menus.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.link}
                  onClick={() => handleMenuClick(menu.label)}
                  className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition"
                >
                  {menu.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => handleMenuClick("Contact Me")}
            className="block mt-3 px-4 py-3 text-center rounded-lg bg-red-500 text-slate-950 font-bold"
          >
            Contact Me
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
