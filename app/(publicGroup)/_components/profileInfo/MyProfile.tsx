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
    Shield,
    User as UserIcon,
    Calendar,
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
    const isTechnician = user.role === "TECHNICIAN";
    const isAdmin = user.role === "ADMIN";
    const isCustomer = user.role === "CUSTOMER";

    return (
        <div className="bg-linear-to-br from-background via-background to-secondary/5">
            {/* Hero Section - Improved Responsiveness */}
            <div className="mb-10">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                    {/* Avatar - Centered on mobile, left-aligned on larger screens */}
                    <div className="relative shrink-0">
                        <Avatar className="h-30 w-30 border-4 shadow-xl transition-all duration-300">
                            <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-background transition-colors duration-300 ${isActive ? "bg-green-500" : "bg-gray-400"}`}
                        />
                    </div>

                    {/* User Info - Centered on mobile, left-aligned on larger screens */}
                    <div className="flex-1 text-center sm:text-left min-w-0">
                        <h1 className="text-3xl font-bold wrap-break-word">
                            {user.name}
                        </h1>

                        <p className="mt-1 sm:mt-2 text-base break-all sm:break-normal">
                            {user.email}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <Badge
                                variant="secondary"
                                className="text-sm p-3"
                            >
                                {user.role}
                            </Badge>
                            <Badge
                                variant={isActive ? "default" : "destructive"}
                                className="text-sm p-3"
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
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Contact Information - Always visible */}
                        <InfoCard title="Contact Information">
                            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
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

                        {/* Technician Profile - Only show for TECHNICIAN role */}
                        {isTechnician && user.technicianProfile && (
                            <>
                                <InfoCard title="About">
                                    <p className="leading-relaxed text-sm sm:text-base">
                                        {user.technicianProfile.bio || "No bio provided"}
                                    </p>
                                </InfoCard>

                                <InfoCard title="Skills" icon={<Code2 />}>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {user.technicianProfile.skills?.length > 0 ? (
                                            user.technicianProfile.skills.map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="text-xs sm:text-sm bg-blue-600 text-white p-3"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No skills listed</p>
                                        )}
                                    </div>
                                </InfoCard>

                                <InfoCard title="Experience" icon={<Award />}>
                                    <p className="font-semibold text-sm sm:text-base">
                                        {user.technicianProfile.experience || "Not specified"}
                                    </p>
                                    {user.technicianProfile.description && (
                                        <p className="text-sm mt-2">
                                            {user.technicianProfile.description}
                                        </p>
                                    )}
                                </InfoCard>

                                {/* Location for Technician */}
                                {user.technicianProfile.location && (
                                    <InfoCard title="Service Location" icon={<MapPin />}>
                                        <p className="text-sm sm:text-base">
                                            {user.technicianProfile.location}
                                        </p>
                                    </InfoCard>
                                )}
                            </>
                        )}

                        {/* Admin Specific Information */}
                        {isAdmin && (
                            <InfoCard title="Administrator Information" icon={<Shield />}>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Role:</span>
                                        <span>Administrator</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Joined:</span>
                                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </InfoCard>
                        )}

                        {/* Customer Specific Information */}
                        {isCustomer && (
                            <InfoCard title="Customer Information" icon={<UserIcon />}>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">Member since:</span>
                                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {user.address && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Location:</span>
                                            <span>{user.address}</span>
                                        </div>
                                    )}
                                </div>
                            </InfoCard>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-5">
                        {/* Rating - Only show for TECHNICIAN */}
                        {isTechnician && user.technicianProfile && (
                            <InfoCard title="Rating">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400" />
                                    <span className="text-3xl sm:text-4xl font-bold">
                                        {user.technicianProfile.rating || "N/A"}
                                    </span>
                                    {user.technicianProfile.totalReviews !== undefined && (
                                        <span className="text-sm">
                                            ({user.technicianProfile.totalReviews} reviews)
                                        </span>
                                    )}
                                </div>
                            </InfoCard>
                        )}

                        {/* Account Status - Always visible */}
                        <InfoCard title="Account Status">
                            <Badge className="text-xs sm:text-sm p-3">
                                {isActive ? "Active" : "Inactive"}
                            </Badge>
                        </InfoCard>

                        {/* Role - Always visible */}
                        <InfoCard title="Role">
                            <p className="font-semibold text-sm sm:text-base">
                                {user.role}
                            </p>
                        </InfoCard>

                        {/* Member Since - Always visible */}
                        <InfoCard title="Member Since">
                            <p className="text-sm sm:text-base">
                                {new Date(user.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </InfoCard>

                        {/* Technician Stats - Only show for TECHNICIAN */}
                        {isTechnician && user.technicianProfile && (
                            <>
                                {/* <InfoCard title="Total Reviews">
                                    <p className="text-2xl font-bold">
                                        {user.technicianProfile.totalReviews || 0}
                                    </p>
                                </InfoCard> */}

                                {user.technicianProfile.location && (
                                    <InfoCard title="Service Area">
                                        <p className="text-sm sm:text-base">
                                            {user.technicianProfile.location}
                                        </p>
                                    </InfoCard>
                                )}
                            </>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}
