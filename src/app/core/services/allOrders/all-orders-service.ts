import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAllOrders } from '../../interfaces/allOrders/iall-orders';

@Injectable({
  providedIn: 'root'
})
export class AllOrdersService {
  private http = inject(HttpClient);

  getUserOrders(userId:string):Observable<IAllOrders[]>{
    return this.http.get<IAllOrders[]>(`${environment.baseUrl}orders/user/${userId}`)
  }
}
