import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { TopNav } from "@/components/navbar/top-nav";
import ToasterProvider from "@/components/toaster-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VPASS Password Manager",
  description: "Manage all your passwords with vpass",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          <TopNav />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
