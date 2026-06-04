import Link from "next/link";
import {
    LogoFacebook,
    LogoGithub,
    LogoLinkedin,
} from "@gravity-ui/icons";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-16 text-white">
            {/* subtle grid glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(80,70,255,0.12),transparent_35%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center">
                            <span className="text-3xl font-black tracking-tight">
                                <span className="text-[#168BFF]">hire</span>
                                <span className="text-[#FF6A00]">loop</span>
                            </span>
                        </Link>

                        <p className="mt-7 max-w-xs text-sm leading-7 text-zinc-500">
                            The AI-native career platform. Built for people who take their
                            work seriously.
                        </p>

                        <div className="mt-28 flex items-center gap-3 md:mt-24">
                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-zinc-400 transition hover:bg-[#4f46e5] hover:text-white"
                            >
                                <LogoFacebook className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="Pinterest"
                                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#4f46e5] text-white transition hover:opacity-90"
                            >
                                <LogoGithub className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-zinc-400 transition hover:bg-[#4f46e5] hover:text-white"
                            >
                                <LogoLinkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-medium text-[#5E4BFF]">Product</h3>
                        <ul className="mt-6 space-y-5 text-sm text-zinc-500">
                            <li>
                                <Link href="/jobs" className="hover:text-white">
                                    Job discovery
                                </Link>
                            </li>
                            <li>
                                <Link href="/worker-ai" className="hover:text-white">
                                    Worker AI
                                </Link>
                            </li>
                            <li>
                                <Link href="/companies" className="hover:text-white">
                                    Companies
                                </Link>
                            </li>
                            <li>
                                <Link href="/salary" className="hover:text-white">
                                    Salary data
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Navigations */}
                    <div>
                        <h3 className="text-sm font-medium text-[#5E4BFF]">Navigations</h3>
                        <ul className="mt-6 space-y-5 text-sm text-zinc-500">
                            <li>
                                <Link href="/help" className="hover:text-white">
                                    Help center
                                </Link>
                            </li>
                            <li>
                                <Link href="/career-library" className="hover:text-white">
                                    Career library
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-medium text-[#5E4BFF]">Resources</h3>
                        <ul className="mt-6 space-y-5 text-sm text-zinc-500">
                            <li>
                                <Link href="/brand-guideline" className="hover:text-white">
                                    Brand Guideline
                                </Link>
                            </li>
                            <li>
                                <Link href="/newsroom" className="hover:text-white">
                                    Newsroom
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 flex flex-col gap-4 text-sm text-zinc-600 md:ml-auto md:w-fit md:flex-row md:items-center md:gap-8">
                    <p>Copyright 2024 —Programming Hero</p>

                    <div className="flex gap-2">
                        <Link href="/terms" className="hover:text-white">
                            Terms & Policy
                        </Link>
                        <span>-</span>
                        <Link href="/privacy" className="hover:text-white">
                            Privacy Guideline
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}