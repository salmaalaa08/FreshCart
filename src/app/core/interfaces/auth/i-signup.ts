export interface ISignup {
    name: string,
    email:string,
    password:string,
    rePassword:string,
    phone:string
}
export interface IRegisterData {
    message: string
    user: User
    token: string
  }
  
  export interface User {
    name: string
    email: string
    role: string
  }
  