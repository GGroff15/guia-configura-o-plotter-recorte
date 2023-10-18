import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaProcessosComponent } from './pagina/lista-processos/lista-processos.component';
import { NovoProcessoComponent } from './pagina/novo-processo/novo-processo/novo-processo.component';
import { EditarProcessoComponent } from './pagina/editar-processo/editar-processo.component';

const routes: Routes = [
  {path: '', component: ListaProcessosComponent},
  {path: 'processos', redirectTo: ''},
  {path: 'editar-processo/:id', component: EditarProcessoComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
