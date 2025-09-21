import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { IShippingAddress } from '../../interfaces/shippingAddress/i-shipping-address';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  checkoutSession(shippingAddress:IShippingAddress, cartId:string|null):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {shippingAddress:shippingAddress},
      {headers: {
        token: this.cookies.get('token')
      }}
    )
  }

  cashPay(shippingAddress:IShippingAddress, cartId:string|null):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/${cartId}`,
      {shippingAddress:shippingAddress},
      {headers: {
        token: this.cookies.get('token')
      }}
    )
  }
}
