import { ICurrentUser } from "src/app/auth/data-access/state/auth.reducer";

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IConfirmPass {
  newPassword: string;
  token: string;
}
export interface IverifyOtp {
  otp: string;
  email?: string;
}

export interface UserDoc {
  _id: string;
  userName?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  otp?: string;
  profileImgUrl?: string;
  isEmailVerified: boolean;
  isBlocked?: boolean;
  userId?:string;
  isVerifiedEmail?:string;
}

export interface userResponse {
  status: string;
  message: string;
  data: Object | null | undefined | string;
}

export interface IFollowersDetails{
  status:string;
  message:string;
  connectionData:[{
    _id:string;
    userId:string;
    followers:[IUserInfo];
    following:[IUserInfo]
  }]
}
export interface IUpdateProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  profilePic?: {
      key?: string;
      name: string;
      url?: string;
  };
  isVerifiedEmail?: boolean;
  password?:string;
  currentPassword?:string;
}


export interface IUserInfo {
  _id:string
  firstName: string;
  lastName: string;
  email: string;
  isVerifiedEmail: boolean;
  mobile: string;
  isBlocked: boolean;
  profilePic?:string;
}