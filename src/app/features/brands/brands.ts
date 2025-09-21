import { Component, WritableSignal, inject, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { BrandsData} from '../../core/interfaces/brands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {
  private brandsService = inject(BrandsService);
  public transalte = inject(TranslateService);
  brandsList:WritableSignal<BrandsData[]> = signal([]);

  ngOnInit(): void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        // console.log(res)
        this.brandsList.set(res.data);
      }
    })
  }

}
