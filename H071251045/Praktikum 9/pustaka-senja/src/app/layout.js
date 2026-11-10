import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pustaka Senja",
  description: "Katalog buku untuk ruang baca dan perpustakaan komunitas.",
};

function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;