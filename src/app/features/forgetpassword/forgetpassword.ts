import { Component, inject } from '@angular/core';
import { ForgetPasswordService } from '../../core/services/auth/forget-password-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForgetpassword } from '../../core/interfaces/auth/i-forgetpassword';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss'
})
export class Forgetpassword {
  private _forgetPassword = inject(ForgetPasswordService);
  public translate = inject(TranslateService);
  errMsg:string = '';
  isLoading:boolean = false;
  step:number = 1;
  private router = inject(Router);
  
  forgetpasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  resetCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{6}$/)]),
  })
  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })


  submitForgetForm(){
    if(this.forgetpasswordForm.valid){
      this.isLoading = true;
      this._forgetPassword.forgetPassword(this.forgetpasswordForm.value).subscribe({
        next:(res) =>{
          // console.log(res);
          if(res.statusMsg == 'success'){
            this.step = 2;
            this.isLoading = false;
          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoading = false;
  
        }
      })
      // console.log(this.forgetpasswordForm)
    }else{
      this.forgetpasswordForm.markAllAsTouched()
    }
  }
  submitCodeForm(){
    if(this.resetCodeForm.valid){
      this.isLoading = true;
      this._forgetPassword.resetCode(this.resetCodeForm.value).subscribe({
        next:(res) =>{
          // console.log(res);
          if(res.status == 'Success'){
            this.step = 3;
            this.isLoading = false;
          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoading = false;
  
        }
      })
      // console.log(this.resetCodeForm)
    }else{
      this.resetCodeForm.markAllAsTouched()
    }
  }
  submitNewPassForm(){
    if(this.resetPasswordForm.valid){
      this.isLoading = true;
      this._forgetPassword.resetPassword(this.resetPasswordForm.value).subscribe({
        next:(res) =>{
          // console.log(res);
          if(res.token){
            this.router.navigate(['/login'])
            this.isLoading = false;
          }
        },
        error:(err) =>{
          // console.log(err)
          this.errMsg = err.error.message;
          this.isLoading = false;
  
        }
      })
      // console.log(this.resetPasswordForm)
    }else{
      this.resetPasswordForm.markAllAsTouched()
    }
  }
  }
  


