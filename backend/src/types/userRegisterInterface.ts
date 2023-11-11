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
    otp?:string;
    password?: string;
    isGoogleUser: boolean;
    isVerifiedEmail:boolean;
}
