import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/productsService';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from "@angular/forms";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Data } from '../../core/interfaces/products/iproduct-details';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, FormsModule, TranslatePipe, CommonModule, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {
  private activated = inject(ActivatedRoute);
  private prod = inject(ProductsService);
  public translate = inject(TranslateService)
  dataDetails = signal<any>([]);
  Id!:string|null;

  getProductId(){
    this.activated.paramMap.subscribe({
      next:(paramUrl) =>{
        // console.log(paramUrl);
        this.Id = paramUrl.get('id');
        // console.log(this.Id)
      }
    })
  }
  getData(){
    this.prod.getProductDetails(this.Id).subscribe({
      next:(res) => {
        console.log(res)
        this.dataDetails.set(res.data);
        // console.log(this.dataDetails());
      }
    })
  }
  ngOnInit(): void {
    this.getProductId();
    this.getData();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  private cart = inject(CartService);
  private toatr = inject (ToastrService);

  addToCart(id:string){
    this.cart.addToCart(id).subscribe({
      next: (res) => {
        // console.log(res)
        this.cart.cartNumber.next(res.numOfCartItems);
        this.toatr.success(res.message, 'success');
      },
      error: (err) => {
        // console.log(err)
        this.toatr.error(err.message, 'error')
      }
    })
  }
}
