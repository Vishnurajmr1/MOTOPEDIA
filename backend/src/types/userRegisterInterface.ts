export interface UserRegisterInterface {
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: {
        keys?: string;
        name: string;
        url?: string;
    };
    mobile?: string;
    password?: string;
    isGoogleUser: boolean;
}
