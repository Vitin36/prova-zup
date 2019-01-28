import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  { path: 'listagem', loadChildren: './com-menu/com-menu.module#ComMenuModule' },
  { path: 'usuario', loadChildren: './sem-menu/sem-menu.module#SemMenuModule' },
  { path : "**", redirectTo : 'listagem' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
