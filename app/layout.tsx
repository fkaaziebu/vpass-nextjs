import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "VPASS",
  description: "VPASS new version in nextjs",
};

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Sidebar />
        {children}
        {modal}
      </body>
    </html>
  );
}
