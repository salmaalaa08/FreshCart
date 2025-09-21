import { Component, WritableSignal, inject, signal } from '@angular/core';
import { AllOrdersService } from '../../core/services/allOrders/all-orders-service';
import { LoginService } from '../../core/services/auth/login-service';
import { VerifyToken } from '../../core/services/auth/verify-token';
import { switchMap } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IAllOrders } from '../../core/interfaces/allOrders/iall-orders';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, CurrencyPipe, TranslatePipe],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders {
  private allOrders = inject(AllOrdersService);
  private token = inject(VerifyToken);
  public translate = inject(TranslateService);
  userId!:string;
  ordersList:WritableSignal<IAllOrders[]> = signal([]);

  // getUserId(){
  //   this.token.getUserId().subscribe({
  //     next: (res) => {
  //       // console.log(res);
  //       this.userId = res.decoded.id
  //       this.getUserOrders()
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  //   }

  //   getUserOrders(){
  //     this.allOrders.getUserOrders(this.userId).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     })
  //   }

  //   ngOnInit(): void {
  //     this.getUserId();
  //   }

  ngOnInit(): void {
    this.token.getUserId().pipe(
      switchMap((res) => {
        // console.log('token',res)
        this.userId = res.decoded.id;
        return this.allOrders.getUserOrders(this.userId);
      })
    ).subscribe({
      next: (res) => {
        // console.log(res);
        this.ordersList.set(res)
        // console.log(this.ordersList())
      },
      // error: (err) => console.log(err)
    });
  }
  
  
}
