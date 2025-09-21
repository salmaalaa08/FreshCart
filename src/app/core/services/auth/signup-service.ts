import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterData, ISignup } from '../../interfaces/auth/i-signup';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private http = inject(HttpClient);
  registerData(payload:ISignup):Observable<IRegisterData>{
    return this.http.post<IRegisterData>(`${environment.baseUrl}auth/signup`, payload)
  }
}
