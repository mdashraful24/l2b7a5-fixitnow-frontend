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
    };
}

export type MyProfileProps = {
    user: IUserProfile
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
    categoryId: string;
    category: ICategory;
    createdAt?: string;
    updatedAt?: string;
}

export interface IService {
    id: string;
    title: string;
    description: string;
    price: number;
    hourlyRate: number | null;
    duration: number;
    isAvailable: boolean;
    category: ICategory;
    technician: {
        id: string;
        location: string;
        rating: number;
        totalReviews: number;
        user: {
            name: string;
        };
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

export type BookingStatus = 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

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

export type StatusFilter = "ALL" | 'REQUESTED' | 'ACCEPTED' | 'DECLINED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type AvailabilitySlot = {
    id: string;
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
