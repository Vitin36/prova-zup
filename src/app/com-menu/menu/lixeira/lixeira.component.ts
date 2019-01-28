import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Data } from '../../../models/data.model';
import { Subscription } from 'rxjs';
import { BuscaService } from 'src/app/services/busca.service';

@Component({
  selector: 'app-lixeira',
  templateUrl: './lixeira.component.html',
  styleUrls: ['./lixeira.component.scss']
})
export class LixeiraComponent implements OnInit, OnDestroy {

  data : Data[];
  sub : Subscription;
  visiveis = ['imagem', 'nome', 'email', 'telefone', 'localizacao', 'acoes']

  constructor(
    private service : DataService,
    private buscaService : BuscaService
    ) { }

  ngOnInit() {
    this.data = this.service.getLixeira();
    this.sub = this.service.subsLixeira.subscribe((x : Data[]) => {  this.data = x; });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  atendidos(data: Data) {
      this.service.setEstado(data, "ATENDIDO");
  }

  todos(data:Data){
    this.service.setEstado(data, "TODOS");
  }

  getData() : Data[]{
    return this.buscaService.filterData(this.data);
  }

}
