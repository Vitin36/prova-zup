import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Data } from '../../../models/data.model';
import { Subscription } from 'rxjs';
import { BuscaService } from 'src/app/services/busca.service';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-atendidos',
  templateUrl: './atendidos.component.html',
  styleUrls: ['./atendidos.component.scss']
})
export class AtendidosComponent implements OnInit, OnDestroy {

  data: Data[];
  dataShow: Data[];
  subs: Subscription;
  sub2: Subscription;
  pipe: SearchPipe = new SearchPipe();
  page_size: number = 10;
  page_number: number = 0;
  @ViewChild('paginator') paginatior: MatPaginator;
  visiveis = ['imagem', 'nome', 'email', 'telefone', 'localizacao', 'acoes']

  constructor(
    private service: DataService,
    private buscaService: BuscaService
  ) { }

  ngOnInit() {
    this.data = this.service.getAtendidos();
    this.setDataShow(this.buscaService.getBusca());
    this.subs = this.service.subsAtendidos.subscribe((x: Data[]) => {
      this.data = x;
      this.setDataShow((this.buscaService.getBusca()));
    });
    this.sub2 = this.buscaService.buscaChanges.subscribe(
      x => {
        this.setDataShow(x);
        this.page_number = 0;
        if (this.paginatior)
          this.paginatior.pageIndex = 0;
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.sub2.unsubscribe();
  }

  lixeira(data: Data) {
    this.service.setEstado(data, "LIXEIRA");
  }

  todos(data: Data) {
    this.service.setEstado(data, "TODOS");
  }

  setDataShow(stream) {
    this.dataShow = this.pipe.transform(this.data, stream);
  }

  paginate(event) {
    this.page_size = Number(event.pageSize);
    this.page_number = Number(event.pageIndex);
  }

}
