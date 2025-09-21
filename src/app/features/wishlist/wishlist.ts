import { Component, WritableSignal, inject, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist-service';
import { CartService } from '../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {
  private wishlist = inject(WishlistService);
  private cart = inject(CartService);
  private toatr = inject(ToastrService);
  public translate = inject(TranslateService);
  wishlistItems:WritableSignal<any[]> = signal([]);

  getWishlist(){
    this.wishlist.getUserWishlist().subscribe({
      next: (res) => {
        // console.log(res);
        this.wishlistItems.set(res.data);
        this.wishlist.wishlistNumber.next(res.count);
      }
    })
  }

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

  removeItem(id:string){
    this.wishlist.removeItem(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.toatr.success(res.message, 'success');
        this.getWishlist();
      }
    })
  }

  ngOnInit(): void {
    this.getWishlist();
  }
}
