"use client";

import { useState } from "react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";

export default function Signup() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: 'seeker'
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

    const handleSignup = async (e) => {
        e.preventDefault();

        setErrorMsg("");
        setSuccessMsg("");

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        if (form.password.length < 8) {
            setErrorMsg("Password must be at least 8 characters.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await signUp.email({
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role
            });

            if (error) {
                setErrorMsg(error.message || "Failed to create account.");
                return;
            }

            setSuccessMsg("Account created successfully. Redirecting to sign in...");

            setForm({
                name: "",
                email: "",
                password: "",
                role: 'seeker'
            });

            setTimeout(() => {
                router.push("/auth/signin");
            }, 1200);
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

                    <h1 className="text-3xl font-semibold">Create your account</h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Start applying for jobs or hiring top talent.
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

                    <form onSubmit={handleSignup} className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#665cff]"
                            />
                        </div>

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








                        <div className="flex flex-col gap-4">
                            <Label>Role</Label>
                            <RadioGroup onChange={(value) => setForm((prev) => ({ ...prev, role: value }))} defaultValue="seeker" name="role" orientation="horizontal">
                                <Radio value="seeker">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Job seeker</Label>

                                    </Radio.Content>
                                </Radio>
                                <Radio value="recruiter">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Recruiter</Label>
                                    </Radio.Content>
                                </Radio>

                            </RadioGroup>
                        </div>








                        <div>
                            <label className="mb-2 block text-sm text-zinc-300">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Minimum 8 characters"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#665cff]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-[#665cff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#756dff] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="font-medium text-[#756dff]">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}