"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import localFont from "next/font/local";
import "./globals.css";

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

// function Navbar({ className }) {
//   return (
//     <div
//       className={cn("fixed top-10 inset-x-0 max-w-sm mx-auto z-50 border-2 rounded-full", className)}
//     >
//       <Menu setActive={setActive}>
        
//             <HoveredLink href="/">Landing</HoveredLink>
//             <HoveredLink href="/registration">Interface Design</HoveredLink>
//             <HoveredLink href="/submission">Search Engine Optimization</HoveredLink>
//             <HoveredLink href="/branding">Branding</HoveredLink>
//       </Menu>
//     </div>
//   );
// }

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('');

  return (
    <div className="fixed h-16 top-10 inset-x-0 max-w-md mx-auto z-50 border-2 rounded-full bg-white bg-opacity-90">
      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="hidden md:flex px-6 gap-x-6 text-black text-center font-medium">
          <div className={`flex items-center hover:underline ${currentPage === '/' ? 'underline' : ''}`}>
            <Link href="/">
              <p onClick={() => setCurrentPage('/')}>Landing</p>
            </Link>
          </div>
          <div className={`flex items-center hover:underline ${currentPage === '/registration' ? 'underline' : ''}`}>
            <Link href="/registration">
              <p onClick={() => setCurrentPage('/registration')}>Registration</p>
            </Link>
          </div>
          <div className={`flex items-center hover:underline ${currentPage === '/submission' ? 'underline' : ''}`}>
            <Link href="/submission">
              <p onClick={() => setCurrentPage('/submission')}>Submission</p>
            </Link>
          </div>
          <div className={`flex items-center px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-500 hover:text-white`}>
            <Link href="/login">
              <p onClick={() => setCurrentPage('/login')}>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-8 bg-gray-100">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
