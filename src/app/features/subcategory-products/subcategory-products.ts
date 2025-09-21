import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../core/services/products/productsService';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { IProducts } from '../../core/interfaces/products/iproducts';

@Component({
  selector: 'app-subcategory-products',
  imports: [Card,TranslatePipe],
  templateUrl: './subcategory-products.html',
  styleUrl: './subcategory-products.scss'
})
export class SubcategoryProducts {
  private productService = inject(ProductsService);
  private activated = inject(ActivatedRoute);
  public translate = inject(TranslateService);

  products:WritableSignal<IProducts[]> = signal([]);
  subCategoryId!:any;
  subcategoryName:WritableSignal<string> = signal('');

  getProducts(){
    this.productService.getProducts().pipe(
      map(subcategories => {
        return subcategories.data.filter(
          (p:any) => p.subcategory[0].name?.toLowerCase().trim() === this.subCategoryId.toLowerCase().trim()
        )
      })
    ).subscribe({
      next: (res) => {
        // console.log('products:', res);
        this.products.set(res);
      }
    })
  }

  getSubcategoryId(){
    this.activated.paramMap.subscribe({
      next: (parmUrl) => {
        this.subCategoryId = parmUrl.get('name');
        this.subcategoryName.set(this.subCategoryId);
        this.getProducts()
      }
    })
  }

  ngOnInit(): void {
    this.getSubcategoryId();
  }

}
