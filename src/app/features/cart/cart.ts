import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TranslatePipe, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  private cart = inject(CartService);
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService);
  cartId!:string;
  productList:any[]=[];
  totalPrice:number = 0;

  getCart() {
    this.cart.getCart().subscribe({
      next: (res) => {
        // console.log('get cart:', res)
        this.cartId = res.cartId;
        this.productList = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.cart.cartNumber.next(res.numOfCartItems);
      }
    });
  }

  removeItem(id:string){
    this.cart.removeItem(id).subscribe({
      next: (res) => {
        // console.log('remove cart item:', res)
        this.toastr.success('Product deleted');
        this.getCart();
      }
    })
  }

  updateProdCount(count:number, id:string){
    this.cart.updateProdQuantity(count, id).subscribe({
      next: (res) => {
        // console.log('update cart:',res)
        this.getCart();
      }
    })
  }

  clearCart(){
    this.cart.clearCart().subscribe({
      next: (res) => {
        // console.log('clear cart:',res)
        this.toastr.success('Cart is cleared');
        this.getCart();
      }
    })
  }

  ngOnInit():void{
    this.getCart();
  }
}
