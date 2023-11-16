export interface ISignUp{
    first_name:string,
    last_name:string,
    email:string,
    phone:string,
    password:string,
    confirmPassword:string
}

export interface ILogin{
    email:string,
    password:string
}

export interface IConfirmPass{
    newPassword:string;
    token:string
}
export interface IverifyOtp{
otp:string;
email?:string;
}


export interface UserDoc {
	userName?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	phone?: string;
	password: string;
	otp?: string;
	profileImgUrl?: string;
	isEmailVerified: boolean;
}