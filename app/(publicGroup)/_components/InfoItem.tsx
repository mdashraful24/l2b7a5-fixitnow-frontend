export default function InfoItem({
    icon, label, value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {icon}
                {label}
            </div>
            <p className="mt-2 font-medium">
                {value}
            </p>
        </div>
    );
}