import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../../models/data.model';
import { Subscription } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  data: Data;
  sub: Subscription;
  text: String;
  show: String;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router : Router,
    private routerService: RouterService
  ) { }

  ngOnInit() {
    //Como o servico recarrega todos os dados quando as páginas são recarregadas. 
    //Pode ocorrer de um refresh na página do usuário.
    //Se isso ocorrer tenho que esperar o servico me notificar que já carregou os dados.
    //Por isso essa inscrição.
    this.sub = this.service.subsTodos.subscribe(
      () => {
        this.data = this.service.getData(this.route.snapshot.params['id']);
      }
    )
    this.data = this.service.getData(this.route.snapshot.params['id']);
    this.setShow("name");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setShow(show: String) {
    switch (show) {
      case "name":
        this.show = show;
        this.text = "Hi, My name is";
        break;
      case "email":
        this.show = show;
        this.text = "My email address is";
        break;
      case "birthday":
        this.show = show;
        this.text = "My birthday";
        break;
      case "address":
        this.show = show;
        this.text = "My address is";
        break;
      case "phone":
        this.show = show;
        this.text = "My phone number is";
        break;
      case "password":
        this.show = show;
        this.text = "My password is";
        break;
    }
  }

  back(){
    this.router.navigateByUrl(""+this.routerService.getPreviousUrl()+"") ;
  }

}
