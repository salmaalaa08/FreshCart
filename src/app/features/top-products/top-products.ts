import { Component, WritableSignal, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/productsService';
import { Card } from '../../shared/components/card/card';
import { IProducts } from '../../core/interfaces/products/iproducts';

@Component({
  selector: 'app-top-products',
  imports: [Card],
  templateUrl: './top-products.html',
  styleUrl: './top-products.scss'
})
export class TopProducts {
  datalist:WritableSignal<IProducts[]> = signal([]);

  constructor(private products:ProductsService){}

  ngOnInit(): void {
    this.products.getProducts().subscribe({
      next: (res) => {
        this.datalist.set(res.data.slice(0,4));
      }
    })
  }

}
