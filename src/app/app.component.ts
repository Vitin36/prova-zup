import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from './services/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zup-vitor-hugo';

  constructor(private routerService : RouterService) { }

  ngOnInit() { }

}
