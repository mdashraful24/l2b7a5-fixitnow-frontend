import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    User,
    Mail,
    DollarSign,
    Wrench,
    Star,
    CheckCircle,
    XCircle,
    Loader2,
    AlertCircle,
    FileText,
    CreditCard,
    UserCircle,
    CalendarDays,
    Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBookingDetails } from "@/app/(dashboardGroup)/_actions/admin";

type BookingDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
    const { id } = await params;
    const result = await getBookingDetails(id);

    if (!result?.success || !result?.data) {
        notFound();
    }

    const booking = result.data;

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "REQUESTED":
                return {
                    color: "bg-yellow-500",
                    textColor: "text-yellow-700 dark:text-yellow-300",
                    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
                    borderColor: "border-yellow-200 dark:border-yellow-800",
                    icon: Clock,
                    label: "Requested"
                };
            case "ACCEPTED":
                return {
                    color: "bg-green-500",
                    textColor: "text-green-700 dark:text-green-300",
                    bgColor: "bg-green-50 dark:bg-green-950/30",
                    borderColor: "border-green-200 dark:border-green-800",
                    icon: CheckCircle,
                    label: "Accepted"
                };
            case "DECLINED":
                return {
                    color: "bg-orange-500",
                    textColor: "text-orange-700 dark:text-orange-300",
                    bgColor: "bg-orange-50 dark:bg-orange-950/30",
                    borderColor: "border-orange-200 dark:border-orange-800",
                    icon: XCircle,
                    label: "Declined"
                };
            case "PAID":
                return {
                    color: "bg-emerald-500",
                    textColor: "text-emerald-700 dark:text-emerald-300",
                    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
                    borderColor: "border-emerald-200 dark:border-emerald-800",
                    icon: CreditCard,
                    label: "Paid"
                };
            case "IN_PROGRESS":
                return {
                    color: "bg-purple-500",
                    textColor: "text-purple-700 dark:text-purple-300",
                    bgColor: "bg-purple-50 dark:bg-purple-950/30",
                    borderColor: "border-purple-200 dark:border-purple-800",
                    icon: Loader2,
                    label: "In Progress"
                };
            case "COMPLETED":
                return {
                    color: "bg-indigo-500",
                    textColor: "text-indigo-700 dark:text-indigo-300",
                    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
                    borderColor: "border-indigo-200 dark:border-indigo-800",
                    icon: CheckCircle,
                    label: "Completed"
                };
            case "CANCELLED":
                return {
                    color: "bg-red-500",
                    textColor: "text-red-700 dark:text-red-300",
                    bgColor: "bg-red-50 dark:bg-red-950/30",
                    borderColor: "border-red-200 dark:border-red-800",
                    icon: XCircle,
                    label: "Cancelled"
                };
            default:
                return {
                    color: "bg-gray-500",
                    textColor: "text-gray-700 dark:text-gray-300",
                    bgColor: "bg-gray-50 dark:bg-gray-950/30",
                    borderColor: "border-gray-200 dark:border-gray-800",
                    icon: AlertCircle,
                    label: status
                };
        }
    };

    const statusConfig = getStatusConfig(booking.status);
    const StatusIcon = statusConfig.icon;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Booking Details</h1>
                    <p className="text-sm text-muted-foreground">
                        Booking ID: <span className="font-mono text-xs">{booking.id}</span>
                    </p>
                </div>
                <Link href="/dashboard/admin/bookings">
                    <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Bookings
                    </Button>
                </Link>
            </div>

            {/* Status Banner */}
            <div className={`rounded-lg border ${statusConfig.borderColor} ${statusConfig.bgColor} p-4 flex items-center gap-3`}>
                <StatusIcon className={`h-6 w-6 ${statusConfig.textColor}`} />
                <div>
                    <p className={`font-semibold ${statusConfig.textColor}`}>
                        Status: {statusConfig.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        This booking was {statusConfig.label.toLowerCase()} on {formatDateTime(booking.updatedAt)}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                {/* Left Column - Booking Info */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    {/* Booking Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Calendar className="h-5 w-5" />
                                Booking Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Service</p>
                                    <p className="text-base font-semibold text-foreground">{booking.service.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {booking.service.description}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                                    <Badge variant="outline" className="px-2.5 py-3 text-sm bg-primary text-primary-foreground border-primary">
                                        {booking.service.category?.name || "General"}
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Scheduled Date</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{formatDate(booking.scheduledAt)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Scheduled Time</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-foreground">{formatTime(booking.scheduledAt)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Address</p>
                                <div className="flex items-start gap-2 mt-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <span className="text-foreground">{booking.address}</span>
                                </div>
                            </div>

                            {booking.notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Notes</p>
                                        <div className="flex items-start gap-2 mt-1">
                                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                                            <p className="text-sm text-foreground">{booking.notes}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Service Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Briefcase className="h-5 w-5" />
                                Service Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3 -mt-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-lg font-bold text-foreground dark:text-blue-500">${booking.totalAmount}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                    <p className="text-lg font-bold text-foreground mt-1">{booking.service.duration} mins</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                                    <p className="text-lg font-bold text-foreground mt-1">${booking.service.hourlyRate}/hr</p>
                                </div>
                            </div>

                            {/* <div className="mt-4">
                                <p className="text-sm font-medium text-gray-600">Availability</p>
                                <Badge className="mt-1" variant={booking.service.isAvailable ? "default" : "secondary"}>
                                    {booking.service.isAvailable ? "Available" : "Unavailable"}
                                </Badge>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Customer & Technician Info */}
                <div className="space-y-6">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <UserCircle className="h-5 w-5" />
                                Customer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-semibold text-foreground">{booking.customer.name}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{booking.customer.email}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Customer ID</p>
                                <p className="text-xs font-mono text-muted-foreground mt-1">{booking.customer.id}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technician Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Wrench className="h-5 w-5" />
                                Technician
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-semibold text-foreground">{booking.technician.user.name}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{booking.technician.user.email}</span>
                                </div>
                            </div>
                            {booking.technician.rating > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-foreground">{booking.technician.rating.toFixed(1)}</span>
                                        <span className="text-sm text-muted-foreground">
                                            ({booking.technician.totalReviews} reviews)
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{booking.technician.location}</span>
                                </div>
                            </div>
                            {/* {booking.technician.skills.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Skills</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {booking.technician.skills.slice(0, 4).map((skill, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {booking.technician.skills.length > 4 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{booking.technician.skills.length - 4} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )} */}
                            {/* <div>
                                <p className="text-sm font-medium text-muted-foreground">Experience</p>
                                <p className="text-sm mt-1">{booking.technician.experience}</p>
                            </div>
                            {booking.technician.bio && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Bio</p>
                                    <p className="text-sm mt-1 text-muted-foreground">{booking.technician.bio}</p>
                                </div>
                            )} */}
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Technician Status</p>
                                <Badge
                                    className="mt-1"
                                    variant={booking.technician.user.status === "ACTIVE" ? "default" : "destructive"}
                                >
                                    {booking.technician.user.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Booking Timeline */}
                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Created</p>
                                <p className="text-sm">{formatDateTime(booking.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                <p className="text-sm">{formatDateTime(booking.updatedAt)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                                <p className="text-sm">{formatDateTime(booking.scheduledAt)}</p>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </div>
    );
}
