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
  _id?: string;
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
}

export interface userResponse {
  status: string;
  message: string;
  data: Object | null | undefined | string;
}
