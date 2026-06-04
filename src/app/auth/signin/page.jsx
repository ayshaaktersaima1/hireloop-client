"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function Signin() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignin = async (e) => {
        e.preventDefault();

        setErrorMsg("");
        setSuccessMsg("");

        if (!form.email.trim() || !form.password.trim()) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await signIn.email({
                email: form.email,
                password: form.password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMsg(error.message || "Invalid email or password.");
                return;
            }

            setSuccessMsg("Signed in successfully. Redirecting...");

            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error) {
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black px-4 pb-20 pt-44 text-white">
            <div className="mx-auto flex min-h-[calc(100vh-220px)] max-w-7xl items-center justify-center">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#181818]/90 p-8 shadow-2xl backdrop-blur-xl">
                    <Link href="/" className="mb-8 inline-flex">
                        <span className="text-3xl font-black">
                            <span className="text-[#168BFF]">hire</span>
                            <span className="text-[#FF6A00]">loop</span>
                        </span>
                    </Link>

                    <h1 className="text-3xl font-semibold">Welcome back</h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Sign in to continue to your dashboard.
                    </p>

                    {errorMsg && (
                        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSignin} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#665cff]"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="block text-sm text-zinc-300">
                                    Password
                                </label>

                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs font-medium text-[#756dff] hover:text-[#8d86ff]"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#665cff]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#665cff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#756dff] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="font-medium text-[#756dff]">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}