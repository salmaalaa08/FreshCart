import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);

  getAllCategories():Observable<any>{
    return this.http.get(`${environment.baseUrl}categories`);
  }

  getSubCategories(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}categories/${id}/subcategories`);
  }
}
