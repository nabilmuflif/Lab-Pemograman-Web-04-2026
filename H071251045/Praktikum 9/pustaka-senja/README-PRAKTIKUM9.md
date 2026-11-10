# Pustaka Senja – Praktikum 9 (Next.js + PostgreSQL, raw SQL dengan `pg`)

## 1. Siapkan database
1. Pastikan PostgreSQL berjalan. Buka pgAdmin.
2. Jalankan `database/01_buat_database.sql` (Query Tool pada database `postgres`).
3. Jalankan `database/02_tabel_dan_data.sql` pada database `pustaka_senja`
   (klik kanan `pustaka_senja` -> Query Tool). Jalankan SATU KALI. Hasilnya 9 baris.

## 2. Atur DATABASE_URL
Buka `.env.local` di root proyek, lalu ganti `PASSWORD_ANDA`:

    DATABASE_URL=postgresql://postgres:PASSWORD_ANDA@localhost:5432/pustaka_senja

Format: `postgresql://USER:PASSWORD@HOST:PORT/NAMA_DATABASE`.
Jika password mengandung karakter khusus (@ : / #), tulis dalam bentuk URL-encoded.
`.env.local` sudah diabaikan Git (`.env*` di `.gitignore`).

## 3. Instal dan jalankan
    npm install
    npm run dev        # http://localhost:3000
Produksi: `npm run build` lalu `npm start`. Restart server setelah mengubah `.env.local`.

## 4. Cara menguji CRUD
- Read: Beranda menampilkan statistik 9 / 6 / 2. Katalog menampilkan 9 kartu. Klik Lihat Detail.
- Create: Katalog -> Tambah Buku -> isi form -> Simpan. Coba kirim kosong untuk melihat validasi.
- Update: tombol Edit pada kartu -> ubah -> Simpan Perubahan. Anda diarahkan ke halaman detail.
- Delete: tombol Hapus -> Cancel (data tetap) atau OK (data terhapus).
- 404: buka /katalog/999 atau /katalog/abc.
- Persistensi: reload halaman, atau cek di pgAdmin: `SELECT * FROM buku ORDER BY id;`
