import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, ViewChild } from '@angular/core';
import { Data } from '../../../models/data.model';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material';
import { BuscaService } from 'src/app/services/busca.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  data: Data[];
  sub: Subscription
  visiveis = ['imagem', 'nome', 'email', 'telefone', 'localizacao', 'acoes']
  @ViewChild('table') table: MatTable<Data[]>;

  constructor(
    private service: DataService,
    private buscaService : BuscaService
    ) { }

  ngOnInit() {
    this.data = this.service.getTodos();
    this.sub = this.service.subsTodos.subscribe((x: Data[]) => {  
      this.data = x; 
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  lixeira(data: Data) {
    if (data.estado != "LIXEIRA")
      this.service.setEstado(data, "LIXEIRA");
  }

  atendidos(data: Data) {
    if (data.estado != "ATENDIDO")
      this.service.setEstado(data, "ATENDIDO");
  }

  todos(data:Data){
    if (data.estado != "TODOS")
    this.service.setEstado(data, "TODOS");
  }

  getData() : Data[]{
    return this.buscaService.filterData(this.data);
  }

}
