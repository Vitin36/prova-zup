import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Data } from '../../../models/data.model';
import { Subscription } from 'rxjs';
import { BuscaService } from 'src/app/services/busca.service';

@Component({
  selector: 'app-atendidos',
  templateUrl: './atendidos.component.html',
  styleUrls: ['./atendidos.component.scss']
})
export class AtendidosComponent implements OnInit, OnDestroy {

  data: Data[];
  subs: Subscription;
  visiveis = ['imagem', 'nome', 'email', 'telefone', 'localizacao', 'acoes']

  constructor(
    private service: DataService,
    private buscaService : BuscaService
    ) { }

  ngOnInit() {
    this.data = this.service.getAtendidos();
    this.subs = this.service.subsAtendidos.subscribe((x: Data[]) => { this.data = x; });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  lixeira(data: Data) {
    this.service.setEstado(data, "LIXEIRA");
  }

  todos(data: Data) {
    this.service.setEstado(data, "TODOS");
  }

  getData() : Data[]{
    return this.buscaService.filterData(this.data);
  }

}
