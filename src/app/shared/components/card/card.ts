import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnSalePipe } from '../../pipes/on-sale-pipe';
import { CartService } from '../../../core/services/cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { WishlistService } from '../../../core/services/wishlist/wishlist-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, OnSalePipe, TranslatePipe, NgClass, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() productData:any;
  @Input() cartItems:any[] = [];

  private cart = inject(CartService);
  private toatr = inject (ToastrService);
  private wishlist = inject(WishlistService);
  public translate = inject(TranslateService);
  private cookies = inject(CookieService);

  isInWishlist:boolean = false;
  isLoggedIn:boolean = false;
  isInCart:boolean = false;
  quantity:number = 0;


  // addToWhishlist(id:string){
  //   this.wishlist.addToWishlist(id).subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       this.toatr.success(res.message);
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }


  ngOnInit(): void {
    this.isLoggedIn = !!this.cookies.get('token');
    if (this.isLoggedIn) {
      this.wishlist.wishlistItems.subscribe({
        next: (res) => {
          this.isInWishlist = res.includes(this.productData?._id);
        }
      });
      this.cart.cartItems.subscribe({
        next: (items) => {
          const found = items.find(p => p.id === this.productData?._id);
          if (found) {
            this.isInCart = true;
            this.quantity = found.quantity;
          } else {
            this.isInCart = false;
            this.quantity = 0;
          }
        }
      });
    }
  }

 
  toggleWishlist(id: string) {
    if (!this.isLoggedIn) return;

    if (this.isInWishlist) {
      this.wishlist.removeItem(id).subscribe({
        next: (res) => {
          this.toatr.success(res.message);
        }
      });
    } else {
      this.wishlist.addToWishlist(id).subscribe({
        next: (res) => {
          this.toatr.success(res.message);
        }
      });
    }
  }

  addToCart(id: string) {
    this.cart.addToCart(id).subscribe({
      next: (res) => {
        this.cart.cartNumber.next(res.numOfCartItems);
        this.toatr.success(res.message, 'success');
      },
      error: (err) => this.toatr.error(err.message, 'error')
    });
  }

  updateProdCount(newCount: number, productId: string) {
    // if (newCount < 1) return;
    this.cart.updateProdQuantity(newCount, productId).subscribe({
      next: (res) => {
        this.toatr.success('Cart updated');
        this.quantity = newCount;
      }
    });
  }
  
  

}
