export default function InfoCard({
    title, children, icon,
}: {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border bg-card/50 p-6 shadow-sm backdrop-blur transition hover:shadow-md">
            <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                {icon}
                {title}
            </h2>
            {children}
        </div>
    );
}