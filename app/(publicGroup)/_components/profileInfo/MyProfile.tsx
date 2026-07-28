import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MyProfileProps } from "@/lib/type";
import {
    Mail,
    MapPin,
    Star,
    Award,
    Code2,
    Phone,
} from "lucide-react";
import InfoCard from "./InfoCard";
import InfoItem from "./InfoItem";

export default function MyProfile({ user }: MyProfileProps) {
    const initials = user.name
        ?.split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    const isActive = user.status === "ACTIVE";

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/5">
            {/* Hero */}
            <div className="mb-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 shadow-xl">
                            <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-background ${isActive
                            ? "bg-green-500"
                            : "bg-gray-400"
                            }`}
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">
                            {user.name}
                        </h1>
                        <p className="mt-2">
                            {user.email}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <Badge
                                variant="secondary"
                                className="text-sm"
                            >
                                {user.role}
                            </Badge>
                            <Badge
                                variant={
                                    isActive
                                        ? "default"
                                        : "destructive"
                                }
                            >
                                {isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left */}
                    <div className="space-y-6 lg:col-span-2">
                        <InfoCard title="Contact Information">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <InfoItem
                                    icon={<Mail />}
                                    label="Email"
                                    value={user.email}
                                />
                                {user.phone && (
                                    <InfoItem
                                        icon={<Phone />}
                                        label="Phone"
                                        value={user.phone}
                                    />
                                )}
                                {user.address && (
                                    <InfoItem
                                        icon={<MapPin />}
                                        label="Address"
                                        value={user.address}
                                    />
                                )}
                            </div>
                        </InfoCard>

                        {user.technicianProfile && (
                            <>
                                <InfoCard title="About">
                                    <p className="leading-relaxed">
                                        {user.technicianProfile.bio}
                                    </p>
                                </InfoCard>
                                <InfoCard
                                    title="Skills"
                                    icon={<Code2 />}
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {user.technicianProfile.skills.map(
                                            (skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="text-md bg-blue-600 text-white px-3 py-3.5"
                                                >
                                                    {skill}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                </InfoCard>
                                <InfoCard
                                    title="Experience"
                                    icon={<Award />}
                                >
                                    <p className="font-semibold">
                                        {user.technicianProfile.experience}
                                    </p>
                                </InfoCard>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-5">
                        {user.technicianProfile && (
                            <InfoCard title="Rating">
                                <div className="flex items-center gap-2">
                                    <Star className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-4xl font-bold">
                                        {user.technicianProfile.rating}
                                    </span>
                                </div>
                            </InfoCard>
                        )}
                        <InfoCard title="Account Status">
                            <Badge>
                                {isActive ? "Active" : "Inactive"}
                            </Badge>
                        </InfoCard>
                        <InfoCard title="Role">
                            <p className="font-semibold">
                                {user.role}
                            </p>
                        </InfoCard>
                    </aside>
                </div>
            </main>
        </div>
    );
}
