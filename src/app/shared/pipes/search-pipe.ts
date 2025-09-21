import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:any[], productTitle:string): any[] {
    return productList.filter((product) => {
      return product.title.toUpperCase().includes(productTitle.toUpperCase())
    });
  }

}
