import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IVerifyToken } from '../../interfaces/auth/iverify-token';

@Injectable({
  providedIn: 'root'
})
export class VerifyToken {
  private http = inject(HttpClient);

  getUserId():Observable<IVerifyToken>{
    return this.http.get<IVerifyToken>(`${environment.baseUrl}auth/verifyToken`)
  }
}
