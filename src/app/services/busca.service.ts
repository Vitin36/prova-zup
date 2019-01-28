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
    this.buscaChanges.emit(this.busca);
  }

  getBusca() : string{
    return this.busca;
  }

}
