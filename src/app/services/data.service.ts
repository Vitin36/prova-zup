import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Results } from '../models/results.model';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Data[] = [];
  public subsTodos: EventEmitter<Data[]> = new EventEmitter<Data[]>();
  public subsLixeira: EventEmitter<Data[]> = new EventEmitter<Data[]>();
  public subsAtendidos: EventEmitter<Data[]> = new EventEmitter<Data[]>();

  constructor(private http: HttpClient) {
    this.http.get<Results>("https://randomuser.me/api/?results=50&nat=br").subscribe(
      response => {
        this.data = response.results;
        let id = 1;
        this.data.map((x: Data) => { x.estado = "TODOS"; x.id.value = id; id++; });
        this.emitir();
      },
      error => { alert('erro, olhe o console!'); console.log(error); }
    );
  }

  public setEstado(data: Data, estado: string): Boolean {

    if (["TODOS", "ATENDIDO", "LIXEIRA"].indexOf(estado) < 0) {
      console.log('string errada');
      return false;
    }

    let index = this.data.indexOf(data);
    if (index < 0) {
      console.log('index errado', index);
      return false;
    }

    this.data[index].estado = estado;
    this.emitir();
    return true;

  }

  private emitir(): void {
    let lixeira = new Array<Data>();
    let atendidos = new Array<Data>();
    this.data.forEach((x: Data) => {
      switch (x.estado) {
        case "LIXEIRA":
          lixeira.push(x);
          break;

        case "ATENDIDO":
          atendidos.push(x);
          break;
      }
    });
    this.subsTodos.emit(this.data);
    this.subsLixeira.emit(lixeira);
    this.subsAtendidos.emit(atendidos);
  }

  public getTodos(): Data[] {
    return this.data;
  }

  public getLixeira(): Data[] {
    let retorno = new Array<Data>();
    if (this.data != undefined)
      this.data.forEach((x: Data) => {
        if (x.estado === "LIXEIRA")
          retorno.push(x);
      });
    return retorno;
  }

  public getAtendidos(): Data[] {
    let retorno = new Array<Data>();
    if (this.data != undefined)
      this.data.forEach((x: Data) => {
        if (x.estado === "ATENDIDO")
          retorno.push(x);
      });
    return retorno;
  }

  public getData(id: Number): Data {
    let retorno: Data = null;
    this.data.forEach((x: Data) => {
      if (x.id.value === Number(id)) {
        retorno = x;
      }
    });
    return retorno;
  }

}
