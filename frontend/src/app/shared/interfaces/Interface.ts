export interface ISignUp{
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    confirmPassword:string
}

export interface ILogin{
    email:string,
    password:string
}