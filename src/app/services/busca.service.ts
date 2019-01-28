import { Injectable, EventEmitter } from '@angular/core';
import { Data } from '../models/data.model';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  private busca: string;
  public buscaChanges : EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.busca = "";
        this.buscaChanges.emit(this.busca);
      }
    });
  }

  setBusca(string: string) {
    this.busca = string;
  }

  filterData(data: Data[]) {
    let retorno = new Array<Data>();
    data.filter(
      ((x) => {
        if (
          new RegExp(this.busca, 'gi').test(x.name.first) ||
          new RegExp(this.busca, 'gi').test(x.name.last) ||
          new RegExp(this.busca, 'gi').test(x.email)
        )
          retorno.push(x);
      })
    );
    return retorno;
  }

}
