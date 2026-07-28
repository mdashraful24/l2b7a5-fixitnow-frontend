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
