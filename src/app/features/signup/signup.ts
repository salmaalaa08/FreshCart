import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { SignupService } from '../../core/services/auth/signup-service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ISignup } from '../../core/interfaces/auth/i-signup';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {

  private register = inject(SignupService);
  private router = inject(Router);
  public translate = inject(TranslateService);
  errMsg:string = '';
  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators:this.confirmPassword})

  submitForm(){
    if(this.registerForm.valid){
      this.isLoading = true;
      this.register.registerData(this.registerForm.value as ISignup).subscribe({
        next:(res) =>{
          // console.log("signup",res);
          if(res.message == 'success'){
            this.router.navigate(['./login'])
            this.isLoading = false;
          }
        },
        error:(err) =>{
          console.log(err)
          this.errMsg = err.error.message;
          this.isLoading = false;

        }
      })
      // console.log(this.registerForm)
    }else{
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(group:AbstractControl){
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;
    if(password === rePassword){
      return null;
    } else {
      return{mismatch:true}
    }
  }
}
