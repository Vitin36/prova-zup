import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '../models/data.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Data[], term: string): Data[] {
    return (value || []).filter(x => this.testar(x,term));
  }

  testar(data : Data, termo : string){
    return  new RegExp(termo, 'gi').test(data.name.first) ||
    new RegExp(termo, 'gi').test(data.name.last) ||
    new RegExp(termo, 'gi').test(data.email)
  }

}
