import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/productsService';
import { error } from 'console';
import { Card } from "../../shared/components/card/card";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IProducts } from '../../core/interfaces/products/iproducts';

@Component({
  selector: 'app-products',
  imports: [Card, FormsModule, SearchPipe, TranslatePipe],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {

  private products = inject(ProductsService);
  public transalte = inject(TranslateService);
  
  datalist:WritableSignal<IProducts[]> = signal([]);
  
  inputText:string = '';

  getData(){
    this.products.getProducts().subscribe({
      next:(res:any) => {        
        // console.log(res);
        this.datalist.set(res.data);
      }
    })
  }
  ngOnInit(): void {
    this.getData()
  }
}
