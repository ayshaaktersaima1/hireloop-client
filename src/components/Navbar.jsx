"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = useSession();
    console.log('session and pending', session?.user?.name);

    const userName = session?.user?.name;

    const user = session?.user;
    const router = useRouter()

    const handleLogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/sigin"); // redirect to login page
                },
            },
        });
    }

    const links = [
        {
            name: "Browse Jobs",
            href: "/jobs",
        },
        {
            name: "Companies",
            href: "/companies",
        },
        {
            name: "Pricing",
            href: "/pricing",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-5">
            <div className="mx-auto max-w-7xl">
                <div className="flex h-20 items-center justify-between rounded-3xl border border-white/10 bg-[#181818]/90 px-6 backdrop-blur-xl">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-3xl font-black tracking-tight">
                            <span className="text-[#1A8CFF]">hire</span>
                            <span className="text-[#FF7A1A]">loop</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden items-center gap-10 md:flex">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-300 transition hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Right */}
                    <div className="hidden items-center gap-6 md:flex">
                        {
                            user ? <>
                                <p>Hi! {userName}</p>
                                <Button onClick={handleLogOut} variant="ghost"
                                    href="/signin"
                                    className="block rounded-xl border border-white/10 text-center text-white"
                                >
                                    Logout
                                </Button>
                            </> : <>
                                <Link
                                    href="/auth/signin"
                                    className="block rounded-xl border border-white/10 px-4 py-3 text-center text-white"
                                >
                                    Sign In
                                </Link>

                            </>
                        }

                        <Link
                            href="/signup"
                            className="rounded-xl bg-gradient-to-r from-[#5E5BFF] to-[#6D5DFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                    >
                        <svg
                            className="h-7 w-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen
                        ? "max-h-[500px] opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="rounded-3xl border border-white/10 bg-[#181818]/95 p-5 backdrop-blur-xl">
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 space-y-3">
                            {
                                user ? <>
                                    <Button onClick={handleLogOut} variant="ghost"
                                        href="/signin"
                                        className="block rounded-xl border border-white/10 px-4 py-3 text-center text-white"
                                    >
                                        Logout
                                    </Button>
                                </> : <>
                                    <Link
                                        href="/signin"
                                        className="block rounded-xl border border-white/10 px-4 py-3 text-center text-white"
                                    >
                                        Sign In
                                    </Link>

                                </>
                            }


                            <Link
                                href="/signup"
                                className="block rounded-xl bg-gradient-to-r from-[#5E5BFF] to-[#6D5DFF] px-4 py-3 text-center font-medium text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}