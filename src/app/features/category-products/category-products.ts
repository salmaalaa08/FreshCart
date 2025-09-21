import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/productsService';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Card } from '../../shared/components/card/card';
import { IProducts } from '../../core/interfaces/products/iproducts';

@Component({
  selector: 'app-category-products',
  imports: [Card, TranslatePipe],
  templateUrl: './category-products.html',
  styleUrl: './category-products.scss'
})
export class CategoryProducts {
  private productService = inject(ProductsService);
  private activated = inject(ActivatedRoute);
  public translate = inject(TranslateService);

  products:WritableSignal<IProducts[]> = signal([]);
  categoryId!:any;
  categoryName: WritableSignal<string> = signal('');


  getProducts(){
    this.productService.getProducts().pipe(
      map(categorys => {
        return categorys.data.filter(
          (p:any) => p.category?.name?.toLowerCase().trim() === this.categoryId.toLowerCase().trim()
        )
      })
    ) .subscribe({
      next: (res) => {
        this.products.set(res);
        // console.log('products:', res);

        // if (res.length > 0) {
        //   this.categoryName.set(res[0].category?.name || '');
        // }
      }
    })
  }

  getCategoryId(){
    this.activated.paramMap.subscribe({
      next: (paramUrl) => {
        // console.log(paramUrl);
        this.categoryId = paramUrl.get('name');
        // console.log('category id:', this.categoryId);
        this.categoryName.set(this.categoryId);
        this.getProducts();
      }
    })
  }

  ngOnInit(): void {
    this.getCategoryId();
  }
}
