export default function DashboardStateCard({
    Icon,
    title,
    value,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <div className="mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Icon className="h-5 w-5 text-zinc-300" />
                </div>
            </div>

            <p className="mb-2 text-sm text-zinc-400">
                {title}
            </p>

            <h3 className="text-4xl font-semibold text-white">
                {value}
            </h3>
        </div>
    );
}