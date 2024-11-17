"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

const Navbar = () => {
  //TODO: make a dropdown for landing to navigate to different sections
  const [currentPage, setCurrentPage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // TODO: setup login auth
  const [navbarOpacity, setNavbarOpacity] = useState(100); // TODO: fix this opacity shit

  const navLinks = [
    { href: '/', label: 'Landing', showWhenLoggedIn: true, showWhenLoggedOut: true },
    { href: '/registration', label: 'Registration', showWhenLoggedIn: false, showWhenLoggedOut: true },
    { href: '/submission', label: 'Submission', showWhenLoggedIn: true, showWhenLoggedOut: false },
    { href: '/resources', label: 'Resources', showWhenLoggedIn: true, showWhenLoggedOut: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(100 - scrollY / 10, 20);
      setNavbarOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // TODO: responsive navbar
  return (
    <div className={`hidden sm:flex fixed top-10 sm:max-w-md md:max-w-lg mx-auto z-50 rounded-full bg-opacity-${navbarOpacity} ${isLoggedIn ? 'bg-yellow-mid' : 'bg-blue-light'} p-2`}>
      <div className="mx-auto flex justify-center items-center">
        <div className="hidden sm:flex pr-4 pl-8 sm:gap-x-2 md:gap-x-6 text-center font-semibold sm:text-md md:text-lg">
          {navLinks
            .filter(link => (isLoggedIn ? link.showWhenLoggedIn : link.showWhenLoggedOut))
            .map(link => (
              <div key={link.href} className={`flex items-center hover:underline ${currentPage === link.href ? 'underline' : ''}`}>
                <Link href={link.href}>
                  <p onClick={() => setCurrentPage(link.href)}>{link.label}</p>
                </Link>
              </div>
            ))}
          <div className={`flex items-center px-4 py-2 rounded-full text-white cursor-pointer ${isLoggedIn ? 'bg-yellow-dark hover:bg-yellow-hover' : 'bg-blue-mid hover:bg-blue-hover'}`}>
            <p onClick={() => setIsLoggedIn(!isLoggedIn)}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterLink = ({ href, src, alt, text }) => (
  <a
    className="flex items-center gap-2 md:gap-4 hover:underline hover:underline-offset-4"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      aria-hidden
      src={src}
      alt={alt}
      width={20} 
      height={20}
    />
    <div className="text-xs sm:text-sm md:text-md lg:text-lg">
      {text}
    </div>
  </a>
);

const Footer = () => (
  <footer className="grid-rows-4 w-full">
    <div className="row-span-2 bg-grey row-start-3 flex xs:gap-4 sm:gap-8 md:gap-16 flex-wrap items-center justify-center p-8 text-blue-dark font-semibold">
      <FooterLink
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        src="/facebook.png"
        alt="Facebook"
        text="BizMaker 2024"
      />
      <FooterLink
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        src="/instagram.png"
        alt="Instagram"
        text="bizmaker_2024"
      />
      <FooterLink
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        src="/email.png"
        alt="Email"
        text="usm.bizmaker@gmail.com"
      />
    </div>
    <div className="row-span-2 bg-blue-dark text-white">
      <div className="flex justify-center items-center p-4 font-semibold">
        @ 2024 USM SOM Management Society
      </div>
    </div>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-dark`}
      >
        <div className="flex justify-center items-center m-8 absolute w-full">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
