import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onSale'
})
export class OnSalePipe implements PipeTransform {

  transform(title:string): string {
    return `On Sale - ${title}`;
  }

}
