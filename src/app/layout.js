"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PortalDialog } from "@/components/custom/portal-dialog";
import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLoggedInUser } from "@/utils/supabase/login_session";
import { UserRole } from "@/constants";

import localFont from "next/font/local";
import "./globals.css";

import { createClient } from "@/utils/supabase/component";

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
    const router = useRouter();

    // For navbar state
    const [currentPage, setCurrentPage] = useState("/");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    
    // For navbar frontend
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [prevScrollY, setPrevScrollY] = useState(0);
    
    // For login dialog
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Supabase
    const supabase = createClient();

    const navLinks = [
        {
            href: "/",
            label: "Homepage",
            showWhenLoggedIn: true,
            showWhenLoggedOut: true,
            showWhenAdminLoggedIn: true,
        },
        {
            href: "/registration",
            label: "Registration",
            showWhenLoggedIn: true,
            showWhenLoggedOut: true,
            showWhenAdminLoggedIn: false,
        },
        {
            href: "/submission",
            label: "Submission",
            showWhenLoggedIn: true,
            showWhenLoggedOut: false,
            showWhenAdminLoggedIn: false,
        },
        {
            href: "/resources",
            label: "Resources",
            showWhenLoggedIn: true,
            showWhenLoggedOut: false,
            showWhenAdminLoggedIn: false,
        },
        {
            href: "/admin/view_team",
            label: "View Teams",
            showWhenLoggedIn: false,
            showWhenLoggedOut: false,
            showWhenAdminLoggedIn: true,
        },
        {
            href: "/admin/resources",
            label: "Resources",
            showWhenLoggedIn: false,
            showWhenLoggedOut: false,
            showWhenAdminLoggedIn: true,
        },
    ];

    // For navbar appear when scrolling up and disappear when scrolling down
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setNavbarVisible(scrollY <= prevScrollY);
            setPrevScrollY(scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollY]);

    // Fetch user role on mount and refresh
    useEffect(() => {
        const fetchUser = async () => {
            const user = await fetchLoggedInUser();
            if (user) {
                setIsLoggedIn(true);
                if (user.role === UserRole.ADMIN) {
                    setIsAdmin(true);
                } else if (user.role === UserRole.PARTICIPANT) {
                    setIsParticipant(true);
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
                setIsParticipant(false);
            }
        };

        fetchUser();
        setCurrentPage(window.location.pathname);
    }, []);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsParticipant(false);
        setCurrentPage("/");
        const { error } = await supabase.auth.signOut()
        console.log({error});
        window.location.href = "/";
        alert("You have been logged out successfully.");
    };

    const renderLoginButton = () => (
        <div
            className={`flex items-center px-4 py-2 rounded-full text-white cursor-pointer ${isLoggedIn ? "bg-yellow-dark hover:bg-yellow-hover" : "bg-blue-mid hover:bg-blue-hover"}`}
            onClick={isLoggedIn ? handleLogout : () => setOpen(true)}
        >
            <p>{isLoggedIn ? "Logout" : "Login"}</p>
        </div>
    );

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLoginDialogSubmit = async (e) => {
        e.preventDefault();
        const email = formData.email.toLowerCase();

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password: formData.password,
            });

            if (authError) {
                alert("Authentication failed: " + authError.message);
                return;
            }
            
            window.location.href = "/";
            setCurrentPage("/");
            setIsLoggedIn(true);
            setOpen(false);

            // Note: user role check based on table data is done in fetchLoggedInUser()
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <div
                className={`hidden sm:flex fixed top-10 sm:max-w-md md:max-w-xl z-50 rounded-full transition-transform duration-300 ${navbarVisible ? "translate-y-0" : "-translate-y-[200%]"} ${isLoggedIn ? "bg-yellow-mid" : "bg-blue-light"} p-2`}
            >
                <div className='mx-auto flex justify-center items-center'>
                    <div className='text-white hidden sm:flex pr-4 pl-8 sm:gap-x-2 md:gap-x-6 text-center font-bold sm:text-md md:text-lg'>
                        {navLinks
                            .filter((link) => {
                                if (isAdmin) {
                                    return link.showWhenAdminLoggedIn;
                                }
                                return isLoggedIn ? link.showWhenLoggedIn : link.showWhenLoggedOut;
                            })
                            .map((link) => (
                                <div
                                    key={link.href}
                                    className={`flex items-center hover:underline ${currentPage === link.href ? "underline text-black" : ""}`}
                                >
                                    <Link href={link.href}>
                                        <p onClick={() => setCurrentPage(link.href)}>
                                            {link.label}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        <Dialog open={open} onOpenChange={setOpen}>
                            {" "}
                            {/* setOpen is not necessary actually, but simply onOpenChange need a function type value and can't be null */}
                            {renderLoginButton()}
                            <PortalDialog>
                                <DialogHeader>
                                    <DialogTitle className='text-white font-semibold text-2xl'>
                                        Login to Your Profile
                                    </DialogTitle>
                                    <DialogDescription className='text-white'>
                                        Don't have an account? Click{" "}
                                        <Link
                                            href='/registration'
                                            onClick={() => {
                                                setOpen(false);
                                                setCurrentPage("/registration");
                                            }}
                                            className='underline text-blue-mid hover:text-yellow-mid'
                                        >
                                            here
                                        </Link>{" "}
                                        to register.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleLoginDialogSubmit}>
                                    <div className='grid gap-4 p-4 text-white'>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <div className='col-span-1'>
                                                <Label
                                                    htmlFor='name'
                                                    className='text-right text-white'
                                                >
                                                    Email
                                                </Label>
                                            </div>
                                            <div className='col-span-3'>
                                                <Input
                                                    id='email'
                                                    type='email'
                                                    className='col-span-3'
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4'>
                                            <div className='col-span-1'>
                                                <Label
                                                    htmlFor='name'
                                                    className='text-right text-white'
                                                >
                                                    Password
                                                </Label>
                                            </div>
                                            <div className='col-span-3'>
                                                <Input
                                                    id='password'
                                                    type='password'
                                                    className='col-span-3'
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type='submit'
                                            className='bg-blue-mid text-white px-4 py-2 rounded-xl'
                                        >
                                            Login
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </PortalDialog>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
};

const FooterLink = ({ href, src, alt, text }) => (
    <a
        className='flex items-center gap-2 md:gap-4 hover:underline hover:underline-offset-4'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
    >
        <Image aria-hidden src={src} alt={alt} width={20} height={20} />
        <div className='text-xs sm:text-sm md:text-md lg:text-lg'>{text}</div>
    </a>
);

const Footer = () => (
    <footer className='grid-rows-4 w-full'>
        <div className='row-span-2 bg-grey row-start-3 flex xs:gap-4 sm:gap-8 md:gap-16 flex-wrap items-center justify-center p-8 text-blue-dark font-semibold'>
            <FooterLink
                href='https://www.facebook.com/BizMakerUSM/?locale=ms_MY'
                src='/facebook.png'
                alt='Facebook'
                text='BizMaker 2024'
            />
            <FooterLink
                href='https://www.instagram.com/bizmaker_2024/'
                src='/instagram.png'
                alt='Instagram'
                text='bizmaker_2024'
            />
            <FooterLink
                href='mailto:usm.bizmaker@gmail.com'
                src='/email.png'
                alt='Email'
                text='usm.bizmaker@gmail.com'
            />
        </div>
        <div className='row-span-2 bg-blue-dark text-white'>
            <div className='flex justify-center items-center p-4 font-semibold'>
                @ 2024 USM SOM Management Society
            </div>
        </div>
    </footer>
);

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-dark`}
            >
                <div className='flex justify-center absolute w-full'>
                    <Navbar />
                </div>
                {children}
                <Footer />
            </body>
        </html>
    );
}
