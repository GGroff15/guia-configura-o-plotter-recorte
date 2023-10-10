import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { ListaProcessosComponent } from './pagina/lista-processos/lista-processos.component';
import { AppRoutingModule } from './app-routing.module';
import { FiltroTipoProcessoComponent } from './pagina/lista-processos/filtro-tipo-processo/filtro-tipo-processo.component';
import { FormsModule } from '@angular/forms';
import { ItemProcessoComponent } from './pagina/lista-processos/item-processo/item-processo.component';
import { AdicionarProcessoComponent } from './pagina/lista-processos/botao/adicionar-processo/adicionar-processo.component';
import { NovoProcessoComponent } from './pagina/novo-processo/novo-processo/novo-processo.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    ListaProcessosComponent,
    FiltroTipoProcessoComponent,
    ItemProcessoComponent,
    AdicionarProcessoComponent,
    NovoProcessoComponent
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
