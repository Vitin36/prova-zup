import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, ViewChild } from '@angular/core';
import { Data } from '../../../models/data.model';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material';
import { BuscaService } from 'src/app/services/busca.service';
import { SearchPipe } from 'src/app/pipes/search.pipe';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  data: Data[];
  dataShow: Data[];
  sub: Subscription;
  sub2: Subscription;
  visiveis = ['imagem', 'nome', 'email', 'telefone', 'localizacao', 'acoes'];
  searchPipe = new SearchPipe();
  page_size: number = 10;
  page_number: number = 0;
  @ViewChild('paginator') paginatior: MatPaginator;

  constructor(
    private service: DataService,
    private buscaService: BuscaService
  ) { }

  ngOnInit() {
    this.data = this.service.getTodos();
    this.setDataShow(this.buscaService.getBusca());
    this.sub = this.service.subsTodos.subscribe((x: Data[]) => {
      this.data = x;
      this.setDataShow((this.buscaService.getBusca()));
    });
    this.sub2 = this.buscaService.buscaChanges.subscribe(
      x => {
        this.setDataShow(x);
        this.page_number = 0;
        this.page_number = 0;
        if (this.paginatior)
          this.paginatior.pageIndex = 0;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  lixeira(data: Data) {
    if (data.estado != "LIXEIRA")
      this.service.setEstado(data, "LIXEIRA");
  }

  atendidos(data: Data) {
    if (data.estado != "ATENDIDO")
      this.service.setEstado(data, "ATENDIDO");
  }

  todos(data: Data) {
    if (data.estado != "TODOS")
      this.service.setEstado(data, "TODOS");
  }

  setDataShow(stream) {
    this.dataShow = this.searchPipe.transform(this.data, stream);
  }

  paginate(event) {
    this.page_size = Number(event.pageSize);
    this.page_number = Number(event.pageIndex);
  }

}
