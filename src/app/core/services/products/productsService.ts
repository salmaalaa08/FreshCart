import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IProductsResponse } from '../../interfaces/products/iproducts';
import { IProductDetails } from '../../interfaces/products/iproduct-details';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  getProducts():Observable<IProductsResponse>{
    return this.http.get<IProductsResponse>(`${environment.baseUrl}products`)
  }
  getProductDetails(id:string|null):Observable<IProductDetails>{
    return this.http.get<IProductDetails>(`${environment.baseUrl}products/${id}`)
  }
}
