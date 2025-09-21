import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout/checkout-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  private checkout = inject(CheckoutService);
  private router = inject(ActivatedRoute);
  private navigate = inject(Router);
  private toastr = inject(ToastrService);
  public translate = inject(TranslateService)
  errMsg:string = '';
  isLoadingCard:boolean = false;
  isLoadingCash:boolean = false;
  cartId!:string|null;

  checkoutForm:FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),

  })

  submitCard(){
    if(this.checkoutForm.valid){
      this.isLoadingCard = true;
      this.checkout.checkoutSession(this.checkoutForm.value,this.cartId).subscribe({
        next:(res) =>{
          // console.log(res);
          if(res.status == 'success'){
            window.location.href = res.session.url;
            this.isLoadingCard = false;
          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoadingCard = false;

        }
      })
      // console.log(this.loginForm)
    }else{
      this.checkoutForm.markAllAsTouched()
    }
  }

  submitCash(){
    if(this.checkoutForm.valid){
      this.isLoadingCash = true;
      this.checkout.cashPay(this.checkoutForm.value,this.cartId).subscribe({
        next:(res) =>{
          // console.log(res);
          if(res.status == 'success'){
            this.toastr.success('Order is created');
            this.navigate.navigate(['/allorders'])
            this.isLoadingCash = false;
          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoadingCash = false;

        }
      })
      // console.log(this.loginForm)
    }else{
      this.checkoutForm.markAllAsTouched()
    }
  }

  getId(){
    this.router.paramMap.subscribe({
      next: (res) => {
        this.cartId =  res.get('id');
        // console.log("CartId from route:", this.cartId);
      }
    })
  }

  ngOnInit(): void {
    this.getId();
  }
}
