import { EditarCanetaComponent } from './pagina/caneta/editar-caneta/editar-caneta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProcessosComponent } from './pagina/processo/lista-processos/lista-processos.component';
import { EditarProcessoComponent } from './pagina/processo/editar-processo/editar-processo.component';
import { ListaCanetasComponent } from './pagina/caneta/lista-canetas/lista-canetas.component';
import { ListaLaminasComponent } from './pagina/lamina/lista-laminas/lista-laminas.component';
import { EditerLaminaComponent } from './pagina/lamina/editer-lamina/editer-lamina.component';

const routes: Routes = [
  { path: '', component: ListaProcessosComponent },
  { path: 'processos', redirectTo: '' },
  { path: 'editar-processo/:id', component: EditarProcessoComponent },
  { path: 'canetas', component: ListaCanetasComponent },
  { path: 'editar-caneta/:id', component: EditarCanetaComponent },
  { path: 'laminas', component: ListaLaminasComponent },
  { path: 'editar-lamina/:id', component: EditerLaminaComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
