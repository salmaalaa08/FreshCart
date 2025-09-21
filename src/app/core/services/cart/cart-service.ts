import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  cartNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItems: BehaviorSubject<{id:string, quantity:number}[]> = new BehaviorSubject<{id:string, quantity:number}[]>([]);

  constructor() {
    this.cartInit();
  }

  cartInit(){
    const token = this.cookies.get('token');
    if (token) {
      this.getCart().subscribe({
        next: (res) => {
          const items = res.data.products.map(
            (p:any) => ({
              id: p.product._id,
              quantity: p.count
            })
          )
          this.cartNumber.next(res.numOfCartItems);
          this.cartItems.next(items);
        }
      });
    }
  }

  updateCart(items: any[]) {
    this.cartItems.next(items);
  }

  // addToCart(productId: string): Observable<any> {
  //   return this.http.post(`${environment.baseUrl}cart`, { productId });
  // }
  addToCart(id: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}cart`, { productId: id }).pipe(
      tap((res: any) => {
        const current = this.cartItems.value;
        const existing = current.find(p => p.id === id);

        if (existing) {
          existing.quantity += 1;
          this.cartItems.next([...current]);
        } else {
          this.cartItems.next([...current, { id, quantity: 1 }]);
        }

        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }
  
  // updateProdQuantity(count: number, productId: string): Observable<any> {
  //   return this.http.put(`${environment.baseUrl}cart/${productId}`, { count });
  // }
  updateProdQuantity(count: number, productId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}cart/${productId}`, { count }).pipe(
      tap((res: any) => {
        const updated = this.cartItems.value.map(p =>
          p.id === productId ? { ...p, quantity: count } : p
        ).filter(p => p.quantity > 0);

        this.cartItems.next(updated);
        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }

  getCart(): Observable<any> {
    return this.http.get(`${environment.baseUrl}cart`);
  }

  // removeItem(productId: string): Observable<any> {
  //   return this.http.delete(`${environment.baseUrl}cart/${productId}`);
  // }
  removeItem(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart/${productId}`).pipe(
      tap((res: any) => {
        const updated = this.cartItems.value.filter(p => p.id !== productId);
        this.cartItems.next(updated);
        this.cartNumber.next(res.numOfCartItems);
      })
    );
  }


  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart`);
  }
}
