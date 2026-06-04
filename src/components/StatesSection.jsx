"use client";

import Image from "next/image";
import { Briefcase, Factory, Magnifier, Star } from "@gravity-ui/icons";
import { animate, scroll } from "motion"
import { motion } from "motion/react"

export default function StatsSection() {
    const stats = [
        { icon: <Briefcase className="h-5 w-5" />, value: "50K", label: "Active Jobs" },
        { icon: <Factory className="h-5 w-5" />, value: "12K", label: "Companies" },
        { icon: <Magnifier className="h-5 w-5" />, value: "2M", label: "Job Seekers" },
        { icon: <Star className="h-5 w-5" />, value: "97%", label: "Satisfaction Rate" },
    ];

    return (
        <section className="relative min-h-[760px] overflow-hidden bg-black py-32">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/globe.png"
                    alt="Globe background"
                    fill
                    priority
                    className="object-cover object-center opacity-95"
                />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mx-auto mb-20 max-w-4xl text-center">
                    <h2 className="text-4xl font-light leading-tight text-white md:text-5xl">
                        Assisting over 15,000 job seekers
                        <br />
                        find their dream positions.
                    </h2>
                    <motion.p animate={{ rotate: 360 }}>Remote job</motion.p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="flex min-h-[260px] flex-col rounded-[28px] border border-white/10 bg-black/35 p-8 backdrop-blur-md"
                        >
                            <div className="text-white">{item.icon}</div>

                            <div className="mt-auto">
                                <h3 className="text-5xl font-semibold text-white">
                                    {item.value}
                                </h3>
                                <p className="mt-4 text-lg text-zinc-300">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}