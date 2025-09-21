export interface IForgetpassword {
    email:string
}
export interface IResetCode {
    resetCode:string
}
export interface IResetPassword extends IForgetpassword {
    newPassword:string
}

