import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '@angular/router';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: Data[], page_size: number, page_number : number): Data[] {
    console.log(page_size,page_number);
    return  value.slice(page_number * page_size, (page_number + 1) * page_size);
  }

}
