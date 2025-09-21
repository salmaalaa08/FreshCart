import { Component, WritableSignal, inject, signal } from '@angular/core';
import { MainSlider } from '../main-slider/main-slider';
import { CategoriesSlider } from "../categories-slider/categories-slider";
import { CategoriesService } from '../../core/services/categories/categories-service';
import { TopProducts } from "../top-products/top-products";
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [MainSlider, CategoriesSlider, TopProducts, RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private category = inject(CategoriesService);
  public translate = inject(TranslateService);
  datalist:WritableSignal<any[]> = signal([]);

  getCategories(){
    this.category.getAllCategories().subscribe({
      next:(res) =>{
        // console.log(res);
        this.datalist.set(res.data)
      }
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }
}
