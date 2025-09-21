import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IForgetpassword, IResetCode, IResetPassword } from '../../interfaces/auth/i-forgetpassword';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private http = inject(HttpClient);
  forgetPassword(payload:IForgetpassword):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, payload)
  }
  resetCode(payload:IResetCode):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`, payload)
  }
  resetPassword(payload:IResetPassword):Observable<any>{
    return this.http.put(`${environment.baseUrl}auth/resetPassword`, payload)
  }
}
