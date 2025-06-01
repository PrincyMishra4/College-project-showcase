import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientAuthProvider from "../components/ClientAuthProvider";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "College Project Showcase",
  description: "A platform to showcase college projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientAuthProvider>
          <Toaster />
          {children}
        </ClientAuthProvider>
      </body>
    </html>
  );
}
