import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/productsService';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Card } from "../../shared/components/card/card";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IProducts } from '../../core/interfaces/products/iproducts';

@Component({
  selector: 'app-brand-products',
  imports: [Card,TranslatePipe],
  templateUrl: './brand-products.html',
  styleUrl: './brand-products.scss'
})
export class BrandProducts {
  private productsService = inject(ProductsService);
  private activated = inject(ActivatedRoute);
  public translate = inject(TranslateService);

  products:WritableSignal<IProducts[]> = signal([]);
  brandId!:string|null;
  brandName: WritableSignal<string|null> = signal('');

  
  getProducts(){
    this.productsService.getProducts().pipe(
      map(brands => {
        return brands.data.filter(
          (p:any) => p.brand?.name?.toLowerCase().trim() === this.brandId?.toLowerCase().trim())
      })
    )
    .subscribe({
      next: (res) => {
        // console.log(res)
        this.products.set(res);
        // console.log('products:', res)
        
        // if (res.length > 0) {
        //   this.brandName.set(res[0].brand?.name || '');
        // }
      }
    })
  }

  getBrandId(){
    this.activated.paramMap.subscribe({
      next:(paramUrl) =>{
        // console.log(paramUrl);
        this.brandId = paramUrl.get('name');
        // console.log('brand id',this.brandId);
        this.brandName.set(this.brandId);
        this.getProducts();
      }
    })
  }

  ngOnInit(): void {
    this.getBrandId();
  }
}
