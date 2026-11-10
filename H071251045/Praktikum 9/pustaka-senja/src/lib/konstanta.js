
export const DAFTAR_KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri"];


export const PILIHAN_STATUS = [
  { nilai: "tersedia", label: "Tersedia" },
  { nilai: "dipinjam", label: "Sedang Dipinjam" },
  { nilai: "belum", label: "Belum Dikonfirmasi" },
];

export function statusKeBoolean(nilaiStatus) {
  if (nilaiStatus === "tersedia") {
    return true;
  }
  if (nilaiStatus === "dipinjam") {
    return false;
  }
  return null;
}

export function booleanKeStatus(tersedia) {
  if (tersedia === true) {
    return "tersedia";
  }
  if (tersedia === false) {
    return "dipinjam";
  }
  return "belum";
}
