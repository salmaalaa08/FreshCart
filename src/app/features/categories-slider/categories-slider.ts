import { Component, Input} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.html',
  styleUrl: './categories-slider.scss'
})
export class CategoriesSlider {

  @Input() slideData!:any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl:true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
