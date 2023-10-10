import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { ListaProcessosComponent } from './pagina/lista-processos/lista-processos.component';
import { AppRoutingModule } from './app-routing.module';
import { FiltroTipoProcessoComponent } from './pagina/lista-processos/filtro-tipo-processo/filtro-tipo-processo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    ListaProcessosComponent,
    FiltroTipoProcessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
