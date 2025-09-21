import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite-service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../core/services/auth/login-service';
import { flush, tick } from '@angular/core/testing';
import { CartService } from '../../../core/services/cart/cart-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ManualTranslate } from '../../../core/interceptors/manualTranslate/manual-translate';
import { WishlistService } from '../../../core/services/wishlist/wishlist-service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isLoggedin!:boolean;
  cartNumber:number = 0;
  wishlistNumber:number = 0;
  currentLang: string = 'en';
  user:any = null;
  userEmail:any = null;

  private cart = inject(CartService);
  private wishlist = inject(WishlistService);
  private cookies = inject(CookieService);

  constructor(private flowbiteService: FlowbiteService, private loggedin:LoginService, public translate:TranslateService, private manualTranslate: ManualTranslate) {}

  ngOnInit(): void {
    this.loggedin.userData.subscribe({
      next:(res) =>{
        if(res !== null){
          this.isLoggedin = true;
          this.userEmail = this.cookies.get('email');
          this.user = res;
        } else {
          this.isLoggedin = false;
        }
      }
    })
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.cart.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res;
      }
    })
    this.wishlist.wishlistNumber.subscribe({
      next: (res) => {
        this.wishlistNumber = res;
      }
    })

    this.currentLang = this.translate.currentLang || 'en';
  }

  logout(){
    this.loggedin.logout();
  }

  switchLang(lang: string) {
    this.manualTranslate.changeLanguage(lang);
    this.currentLang = lang;
  }
  
  
}
