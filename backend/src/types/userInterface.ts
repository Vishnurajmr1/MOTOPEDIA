export interface UserInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    password: string;
    isGoogleUser: boolean;
    isBlocked: boolean;
    profileUrl: string;
    profilePic?: {
        key?: string;
        name: string;
        url?: string;
    };
}

export interface UserUpdateInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    profilePic?: {
        key?: string;
        name: string;
        url?: string;
    };
}
