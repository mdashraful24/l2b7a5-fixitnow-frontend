export type RegisterState = {
    success: true,
    statusCode: number,
    message: string,
} | {
    success: false,
    statusCode: number,
    message: string,
    name: string
}

export type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type TechnicianProfile = {
    id: string;
    userId: string;
};

export type IUser = {
    success: boolean;
    message: string;
    data: {
        id: string;
        name: string;
        email: string;
        activeStatus: string;
        role: UserRole;
        createdAt: string;
        updatedAt: string;
        technicianProfile?: TechnicianProfile;
    };
};

export type NavbarProps = {
    user: IUser
}

export interface IUserProfile {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: string;
    status: string;
    technicianProfile?: {
        bio: string;
        skills: string[];
        experience: string;
        location: string;
        rating: number;
        totalReviews: number;
        description: string;
    };
    createdAt: string;
}

export type MyProfileProps = {
    user: IUserProfile
}

export interface TechnicianProfileData {
    user: {
        name: string;
        email: string;
        phone?: string;
        role: string;
        status: string;
    };
    location: string;
    rating: number;
    bio?: string;
    description?: string;
    experience?: string;
    skills?: string[];
    reviewStats: IReviewStats;
    services?: IBookingDetailsResponse[];
    availability?: IAvailableSlot[];
}

export interface TechnicianProfileProps {
    technician: TechnicianProfileData;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface ICreateTechServicePayload {
    title: string;
    description: string;
    serviceImage?: string;
    price: number;
    duration: number;
    categoryId: string;
    hourlyRate?: number;
    isAvailable?: boolean;
}

export interface ITechService {
    id: string;
    title: string;
    description: string;
    price: number;
    hourlyRate: number | null;
    duration: number;
    isAvailable: boolean;
    serviceImage: string;
    categoryId: string;
    category: ICategory;
    createdAt?: string;
    updatedAt?: string;
}

export interface IService {
    id: string;
    technicianId: string;
    categoryId: string;
    title: string;
    description: string;
    serviceImage: string;
    price: number;
    hourlyRate: number | null;
    duration: number;
    isAvailable: boolean;
    createdAt?: string;
    updatedAt?: string;
    category: ICategory;
    technician: {
        id: string;
        location: string;
        rating: number;
        totalReviews: number;
        user: {
            name: string;
            phone?: string;
            email?: string;
            address?: string;
        };
        availability: IAvailableSlot[];
        services?: IService[];
        reviews?: IReview[];
    };
}

export interface IServicesResponse {
    success: boolean;
    message: string;
    data: IService[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}

export interface IAvailableSlot {
    id: string;
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
}

export interface ITechnicianPublic {
    id: string;
    bio?: string;
    description?: string;
    experience?: string;
    skills: string[];
    location?: string;
    rating: number;
    totalReviews: number;
    user: {
        name: string;
        phone?: string;
        email?: string;
        status: string;
    };
    services: {
        id: string;
        title: string;
        description: string;
        price: number;
        hourlyRate?: number | null;
        duration: number;
        categoryId: string;
    }[];
    availability: IAvailableSlot[];
    reviews: {
        rating: number;
        comment?: string;
        createdAt: string;
        customer: { name: string };
    }[];
    reviewStats: {
        totalReviews: number;
        averageRating: number;
        ratingDistribution: Record<string, number>;
    };
}

export interface ICreateBookingPayload {
    technicianId: string;
    categoryId: string;
    serviceId: string;
    availableSlotId: string;
    scheduledAt: string;
    address: string;
    notes?: string;
    totalAmount: number;
}

export type BookingStatus = 'REQUESTED' | 'DECLINED' | 'ACCEPTED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface IBooking {
    id: string;
    customerId: string;
    technicianId: string;
    serviceId: string;
    availableSlotId?: string;
    status: BookingStatus;
    scheduledAt: string;
    address: string;
    notes?: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    service: {
        id: string;
        title: string;
        description: string;
        price: number;
        duration: number;
    };
    technician: {
        id: string;
        location?: string;
        user: {
            name: string;
            email: string;
            phone?: string;
        };
    };
    availableSlot?: {
        dayOfWeek: string;
        startAt: string;
        endAt: string;
        isAvailable: boolean;
    };
    customer?: {
        id: string;
        name: string;
        email: string;
    };
    review?: IReview | null;
}

export interface IBookingsResponse {
    success: boolean;
    message: string;
    data: IBooking[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}

export interface IBookingDetailsResponse {
    id: string;
    customerId: string;
    technicianId: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    status: BookingStatus;
    scheduledAt: string;
}

export interface IAvailableSlot {
    id: string;
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
}

export interface IUpdatedAvailableSlot {
    id: string;
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
    technicianId: string;
}

export type StatusFilter = "ALL" | 'REQUESTED' | 'DECLINED' | 'ACCEPTED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type AvailabilitySlot = {
    id: string;
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
};

export type CreateAvailabilityPayload = {
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable: boolean;
};

export interface TechnicianBookingRecord {
    id: string;
    status: string;
    scheduledAt: string;
    address: string;
    totalAmount: number;
    notes?: string;
    technicianId: string;
    createdAt: string;
    updatedAt: string;
    service: {
        id: string;
        title: string;
        description: string;
        price: number;
        duration: number;
    };
    customer?: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    technician?: {
        location?: string;
        user?: {
            name: string;
            email: string;
            phone?: string;
            address?: string;
        };
    };
    review?: IReview | null;
}

export interface TechnicianBookingsResponse {
    success: boolean;
    message: string;
    data: TechnicianBookingRecord[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    } | null;
}

export interface TechnicianBookingActionsProps {
    bookingId: string;
    currentStatus: string;
    compact?: boolean;
};

export interface TechnicianActionResult<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    fieldErrors?: Record<string, string>;
}

export interface UpdateTechnicianProfilePayload {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    description?: string;
    location?: string;
}

export interface TechnicianAvailabilityPayload {
    dayOfWeek: string;
    startAt: string;
    endAt: string;
    isAvailable?: boolean;
}

export interface UpdateTechnicianAvailabilityPayload extends TechnicianAvailabilityPayload {
    availabilitySlotId: string;
}

export interface UpdateTechnicianBookingStatusPayload {
    bookingId: string;
    status: string;
}

export interface CustomerSidebarProps {
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export interface AdminSidebarProps {
    user: {
        name: string;
        email: string;
        role: string;
    };
}

export type IAdminUsers = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    status: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    technicianProfile?: {
        id: string;
        bio: string;
        skills: string[];
        experience: string;
        description: string;
        location: string;
        availability: {
            id: string;
            dayOfWeek: string;
            startAt: string;
            endAt: string;
            isAvailable: boolean;
        }[];
    };
};

export type UserStats = {
    totalUsers: number;
    totalTechnicians: number;
    totalCustomers: number;
    totalAdmins?: number;
    activeUsers: number;
    bannedUsers: number;
};

export interface IAdminBookings {
    id: string;
    customerId: string;
    technicianId: string;
    serviceId: string;
    availableSlotId: string;
    status: BookingStatus;
    scheduledAt: string;
    address: string;
    notes: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    customer: {
        id: string;
        name: string;
        email: string;
    };
    technician: {
        id: string;
        bio: string;
        skills: string[];
        experience: string;
        description: string;
        location: string;
        rating: number;
        totalReviews: number;
        userId: string;
        createdAt: string;
        updatedAt: string;
        user: {
            id: string;
            name: string;
            email: string;
            status: string;
        };
    };
    service: {
        id: string;
        technicianId: string;
        categoryId: string;
        title: string;
        description: string;
        price: number;
        hourlyRate: number;
        duration: number;
        isAvailable: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export type BookingStats = {
    totalBookings: number;
    requestedBookings: number;
    acceptedBookings: number;
    declinedBookings: number;
    paidBookings: number;
    inProgressBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    thisMonth?: number;
};

export type BookingFiltersProps = {
    stats?: BookingStats;
};

export type TotalBookingsCountStats = {
    totalBookings?: number;
    requestedBookings?: number;
    acceptedBookings?: number;
    declinedBookings?: number;
    paidBookings?: number;
    inProgressBookings?: number;
    completedBookings?: number;
    cancelledBookings?: number;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IPayment {
    id: string;
    bookingId: string;
    userId: string;
    transactionId: string;
    amount: number;
    currency: string;
    provider: "STRIPE" | "SSLCOMMERZ";
    status: "PENDING" | "COMPLETED" | "FAILED";
    sessionId: string | null;
    paymentIntentId: string | null;
    metadata: Record<string, unknown>;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
    booking?: IBooking;
}

export interface IPaymentIntentResponse {
    payment: IPayment;
    checkoutUrl: string;
    sessionId: string;
}

export interface IReview {
    id: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
    customer?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface IReviewStats {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
        [key: string]: number;
    };
}

export interface DashboardStats {
    bookings: BookingStats;
    users: UserStats;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
    totalCategories: number;
    growthRate: number;
}

export interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    description?: string;
    trend?: number;
    color: string;
    bgColor: string;
    cardBgColor?: string;
}

export interface MiniStatCardProps {
    title: string;
    value: number;
    color: string;
    icon: React.ElementType;
    bgColor: string;
    iconBgColor: string;
}
