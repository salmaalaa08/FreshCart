import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SignupService } from '../../core/services/auth/signup-service';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/auth/login-service';
import { CookieService } from 'ngx-cookie-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart/cart-service';
import { WishlistService } from '../../core/services/wishlist/wishlist-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private _login = inject(LoginService);
  private router = inject(Router);
  private cookieService = inject(CookieService);
  public translate = inject(TranslateService);
  private cart = inject(CartService);
  private wishlist = inject(WishlistService)
  
  errMsg:string = '';
  isLoading:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })

  submitForm(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this._login.loginData(this.loginForm.value).subscribe({
        next:(res) =>{
          // console.log('login:',res);
          if(res.message == 'success'){
            // localStorage.setItem('token', res.token);
            this.cookieService.set('token', res.token);
            this._login.decodedUserData();
            this.router.navigate(['./home'])
            this.isLoading = false;
            this.cart.cartInit();
            this.wishlist.wishlistInit();

          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoading = false;

        }
      })
      // console.log(this.loginForm)
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
