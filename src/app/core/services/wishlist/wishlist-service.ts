import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  wishlistNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  wishlistItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    this.wishlistInit();
  }

  wishlistInit(){
    const token = this.cookies.get('token');
    if (token) {
      this.getUserWishlist().subscribe({
        next: (res) => {
          const ids = res.data.map(
            (p:any) => p._id
          );
          this.wishlistItems.next(ids);
          this.wishlistNumber.next(res.count);
        }
      });
    }
  }

  // addToWishlist(id:string):Observable<any>{
  //   return this.http.post(`${environment.baseUrl}wishlist`, 
  //     {productId:id}
  //   )
  // }
  addToWishlist(id: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}wishlist`, { productId: id }).pipe(
      tap((res: any) => {
        // Update local cache immediately
        const current = this.wishlistItems.value;
        if (!current.includes(id)) {
          this.wishlistItems.next([...current, id]);
          this.wishlistNumber.next(this.wishlistNumber.value + 1);
        }
      })
    );
  }

  // removeItem(id:string):Observable<any>{
  //   return this.http.delete(`${environment.baseUrl}wishlist/${id}`)
  // }
  removeItem(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}wishlist/${id}`).pipe(
      tap((res: any) => {
        // Update local cache immediately
        const current = this.wishlistItems.value.filter(pid => pid !== id);
        this.wishlistItems.next(current);
        this.wishlistNumber.next(this.wishlistNumber.value - 1);
      })
    );
  }
  
  getUserWishlist():Observable<any>{
    return this.http.get(`${environment.baseUrl}wishlist`)
  }
}
