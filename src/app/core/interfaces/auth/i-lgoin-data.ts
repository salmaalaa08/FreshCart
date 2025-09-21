export interface ILgoinData {
    email:string,
    password:string
}
export interface ILogin {
    message: string
    user: User
    token: string
  }
  
  export interface User {
    name: string
    email: string
    role: string
  }
  
