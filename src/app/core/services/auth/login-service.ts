import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ILgoinData, ILogin } from '../../interfaces/auth/i-lgoin-data';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private cookies = inject(CookieService);
  userData:BehaviorSubject<null | JwtPayload> = new BehaviorSubject <null | JwtPayload> (null);


  constructor(@Inject(PLATFORM_ID) private id:object){
    // if(isPlatformBrowser(id)){
    //   if(localStorage.getItem('token')){
    //     this.decodedUserData();
    //   }
    // }
    if(this.cookies.get('token')){
      this.decodedUserData();
    }
  }

  loginData(payload:ILgoinData):Observable<ILogin>{
    return this.http.post<ILogin>(`${environment.baseUrl}auth/signin`, payload).pipe(
      tap(() => {
        this.cookies.set('email', payload.email);
      })
    )
  }
  decodedUserData(){
    // const token = localStorage.getItem('token');
    const token = this.cookies.get('token');
    const decoded = jwtDecode(token!);
    this.userData.next(decoded);
    // console.log(decoded);
  }
  logout(){
    // remove token
    // localStorage.removeItem('token');
    this.cookies.delete('token')

    // userData => null
    this.userData.next(null);

    // navigate to login
    this.router.navigate(['/login']);
  }
}
