import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './menu/todos/todos.component';
import { AtendidosComponent } from './menu/atendidos/atendidos.component';
import { LixeiraComponent } from './menu/lixeira/lixeira.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { PaginationPipe } from '../pipes/pagination.pipe';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path : '', redirectTo: 'todos' , pathMatch: 'full' },
      { path: 'todos', component: TodosComponent },
      { path: 'atendidos', component: AtendidosComponent },
      { path: 'lixeira', component: LixeiraComponent }
    ],
  }

];

@NgModule({
  declarations: [
    MenuComponent,
    TodosComponent,
    AtendidosComponent,
    LixeiraComponent,
    SearchPipe,
    PaginationPipe
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers : [
    SearchPipe
  ]
})
export class ComMenuModule { }
