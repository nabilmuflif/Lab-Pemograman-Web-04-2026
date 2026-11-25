
// DATA AWAL PRAKTIKAN
const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

// 1. VERIFIKASI ASISTEN LAB MENGGUNAKAN PROMPT
// Daftar Asisten Lab yang diizinkan
const daftarAsisten = [
    "Pepeng",
    "Wali",
    "Alex",
    "Hamdi"
];
const namaAsisten = prompt(
    "Masukkan nama Asisten Lab:"
);

// Memeriksa apakah nama terdaftar
const aksesDiizinkan = daftarAsisten.some(
    nama => nama.toLowerCase() === namaAsisten?.trim().toLowerCase()
);

// 2. PROSES DATA PRAKTIKAN
if (aksesDiizinkan) {

    // Fungsi menghitung rata-rata nilai
    function hitungRataRata(nilaiTugas) {
        const total = nilaiTugas.reduce(
            (jumlah, nilai) => jumlah + nilai, 0
        );

        return total / nilaiTugas.length;
    }

    // Fungsi menentukan status kelulusan
    function tentukanStatus(rataRata) {
        if (rataRata >= 75) {
            return "Lulus";
        } else {
            return "Tidak Lulus";
        }
    }

    // Mengolah data seluruh praktikan menggunakan map()
    const hasilEvaluasi = dataPraktikan.map(praktikan => {

        const rataRata = hitungRataRata(
            praktikan.nilaiTugas
        );

        return {
            nama: praktikan.nama,
            rataRata: rataRata,
            status: tentukanStatus(rataRata)
        };
    });

       // 3. MENAMPILKAN HASIL KE CONSOLE
        console.log("Hasil Evaluasi Praktikum:");
        console.log(hasilEvaluasi);

       // 4. MENAMPILKAN LAPORAN MENGGUNAKAN DOCUMENT.WRITE
        document.write(`

        <style>

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, sans-serif;
            }

            body {
                background-color: #f0f4f9;
                min-height: 100vh;
                padding: 40px 15px;
                color: #1e293b;
            }

            .container {
                background-color: white;
                max-width: 600px;
                margin: 0 auto;
                padding: 25px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
            }

            .header {
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 15px;
                margin-bottom: 15px;
            }

            .header h2 {
                font-size: 22px;
                margin-bottom: 5px;
                color: #172554;
            }

            .header p {
                font-size: 12px;
                color: #64748b;
            }

            .welcome {
                background-color: #eff6ff;
                border-left: 3px solid #3b82f6;
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 15px;
            }

            .welcome h4 {
                color: #1d4ed8;
                font-size: 14px;
                margin-bottom: 5px;
            }

            .welcome p {
                color: #3b82f6;
                font-size: 12px;
            }

            .card {
                border: 1px solid #e5e7eb;
                border-radius: 7px;
                padding: 15px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.04);
            }

            .card-info h3 {
                font-size: 14px;
                margin-bottom: 5px;
            }

            .card-info p {
                font-size: 12px;
                color: #64748b;
            }

            .badge {
                padding: 5px 9px;
                border-radius: 20px;
                font-size: 10px;
                font-weight: bold;
            }

            .lulus {
                background-color: #dcfce7;
                color: #15803d;
            }

            .tidak-lulus {
                background-color: #fee2e2;
                color: #dc2626;
            }

            .ditolak {
                background-color: #fff1f2;
                border-left: 3px solid #ef4444;
                padding: 18px;
                border-radius: 4px;
            }

            .ditolak h4 {
                color: #b91c1c;
                margin-bottom: 5px;
            }

            .ditolak p {
                color: #dc2626;
                font-size: 12px;
            }

            @media (max-width: 480px) {
                .container {
                    padding: 18px;
                }

                .header h2 {
                    font-size: 19px;
                }
            }

        </style>

        <div class="container">

            <div class="header">
                <h2>Sistem Laporan Praktikum</h2>
                <p>Evaluasi kelulusan berbasis JavaScript murni</p>
            </div>

            <div class="welcome">
                <h4>Selamat datang Asisten ${namaAsisten.trim()}!</h4>
                <p>Berikut adalah laporan hasil evaluasi praktikan.</p>
            </div>

            ${hasilEvaluasi.map(praktikan => `

                <div class="card">

                    <div class="card-info">
                        <h3>${praktikan.nama}</h3>

                        <p>
                            Rata-rata: ${praktikan.rataRata}
                        </p>
                    </div>

                    <span class="badge ${
                        praktikan.status === "Lulus"
                        ? "lulus"
                        : "tidak-lulus"
                    }">
                        ${praktikan.status}
                    </span>

                </div>

            `).join("")}

        </div>

    `);

} else {

       // 5. JIKA ASISTEN TIDAK MENGISI NAMA
        document.write(`

        <style>

            body {
                background-color: #f0f4f9;
                font-family: Arial, sans-serif;
                padding: 40px 15px;
            }

            .container {
                background: white;
                max-width: 600px;
                margin: auto;
                padding: 25px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
            }

            .header {
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 15px;
                margin-bottom: 15px;
            }

            .header h2 {
                color: #172554;
                font-size: 22px;
            }

            .header p {
                color: #64748b;
                font-size: 12px;
                margin-top: 5px;
            }

            .ditolak {s
                background: #fff1f2;
                border-left: 3px solid #ef4444;
                padding: 18px;
                border-radius: 4px;
            }

            .ditolak h4 {
                color: #b91c1c;
                font-size: 14px;
                margin-bottom: 5px;
            }

            .ditolak p {
                color: #dc2626;
                font-size: 12px;
            }

        </style>

        <div class="container">

            <div class="header">
                <h2>Sistem Laporan Praktikum</h2>
                <p>Evaluasi kelulusan berbasis JavaScript murni</p>
            </div>

            <div class="ditolak">
                <h4>Akses Ditolak</h4>
                <p>
                    Anda tidak memasukkan identitas asisten.
                </p>
            </div>

        </div>

    `);

    document.write(`
    <div style="
        font-family: Arial;
        text-align: center;
        margin: 100px auto;
        padding: 25px;
        max-width: 500px;
        background: white;
        border-radius: 10px;
    ">
        <h2 style="color: #dc2626;">
            Akses Ditolak!
        </h2>

        <p>
            Nama Anda tidak terdaftar sebagai Asisten Lab.
        </p>

        <p>
            Silakan hubungi Administrator.
        </p>
    </div>
`);

}
