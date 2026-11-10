// Koneksi PostgreSQL (khusus server).
// "server-only" membuat build gagal bila file ini tidak sengaja diimpor
// dari Client Component, sehingga DATABASE_URL tidak mungkin bocor ke browser.
import "server-only";
import { Pool } from "pg";

// Saat development, Next.js memuat ulang modul berulang kali. Pool disimpan di
// globalThis agar tidak terbentuk puluhan Pool (dan koneksi) baru setiap reload.
const globalUntukPool = globalThis;

const pool =
  globalUntukPool.__pustakaSenjaPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalUntukPool.__pustakaSenjaPool = pool;
}

export default pool;
