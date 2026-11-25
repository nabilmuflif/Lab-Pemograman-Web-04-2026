import MenuCard from "./MenuCard";

function MenuList({ daftarMenu, onTambah }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {daftarMenu.length > 0 ? (
        daftarMenu.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onTambah={onTambah}
          />
        ))
      ) : (
        <div className="col-span-full rounded-xl bg-white p-10 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-3 font-semibold text-gray-600">
            Menu tidak ditemukan.
          </p>
        </div>
      )}

    </div>
  );
}

export default MenuList;