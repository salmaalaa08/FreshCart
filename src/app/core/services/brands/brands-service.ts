import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBrands } from '../../interfaces/brands/ibrands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http = inject(HttpClient);

  getBrands():Observable<IBrands>{
    return this.http.get<IBrands>(`${environment.baseUrl}brands`)
  }
}
