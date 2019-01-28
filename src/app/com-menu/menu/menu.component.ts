import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { BuscaService } from 'src/app/services/busca.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('drawer') nav : MatSidenav;
  @ViewChild('busca') busca : NgModel;
  buscas = "";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private buscaService : BuscaService
  ) { }

  ngOnInit() {
    this.busca.update.subscribe(x => {  this.buscaService.setBusca(x); });
    this.buscaService.buscaChanges.subscribe(x => { this.buscas = x ; });
  }

  fecharMenu(){ 
    if(this.nav.mode === "over"){
      this.nav.close();
    }
   }

}
