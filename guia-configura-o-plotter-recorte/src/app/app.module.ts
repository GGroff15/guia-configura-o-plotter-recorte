import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { ListaProcessosComponent } from './pagina/processo/lista-processos/lista-processos.component';
import { AppRoutingModule } from './app-routing.module';
import { FiltroTipoProcessoComponent } from './pagina/processo/lista-processos/filtro-tipo-processo/filtro-tipo-processo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItensProcessoComponent } from './pagina/processo/lista-processos/item-processo/itens-processo.component';
import { AdicionarComponent } from './botao/adicionar-processo/adicionar.component';
import { NovoProcessoComponent } from './pagina/processo/novo-processo/novo-processo.component';
import { ModalComponent } from './modal/modal.component';
import { AdicionarFloatingComponent } from './botao/adicionar-processo-floating/adicionar-floating.component';
import { EditarProcessoComponent } from './pagina/processo/editar-processo/editar-processo.component';
import { ListaCanetasComponent } from './pagina/caneta/lista-canetas/lista-canetas.component';
import { ItensCanetaComponent } from './pagina/caneta/lista-canetas/itens-caneta/itens-caneta.component';
import { NovaCanetaComponent } from './pagina/caneta/nova-caneta/nova-caneta.component';
import { EditarCanetaComponent } from './pagina/caneta/editar-caneta/editar-caneta.component';
import { ListaLaminasComponent } from './pagina/lamina/lista-laminas/lista-laminas.component';
import { NovaLaminaComponent } from './pagina/lamina/nova-lamina/nova-lamina.component';
import { ItensLaminaComponent } from './pagina/lamina/lista-laminas/itens-lamina/itens-lamina.component';
import { EditerLaminaComponent } from './pagina/lamina/editar-lamina/editar-lamina.component';
import { ListaTapetesComponent } from './pagina/tapete/lista-tapetes/lista-tapetes.component';
import { ItensTapeteComponent } from './pagina/tapete/lista-tapetes/itens-tapete/itens-tapete.component';
import { EditarTapeteComponent } from './pagina/tapete/editar-tapete/editar-tapete.component';
import { NovoTapeteComponent } from './pagina/tapete/novo-tapete/novo-tapete.component';
import { HttpClientModule } from '@angular/common/http';
import { MilimeterPipe } from './pipes/milimeter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    ListaProcessosComponent,
    FiltroTipoProcessoComponent,
    ItensProcessoComponent,
    AdicionarComponent,
    NovoProcessoComponent,
    ModalComponent,
    AdicionarFloatingComponent,
    EditarProcessoComponent,
    ListaCanetasComponent,
    ItensCanetaComponent,
    NovaCanetaComponent,
    EditarCanetaComponent,
    ListaLaminasComponent,
    NovaLaminaComponent,
    ItensLaminaComponent,
    EditerLaminaComponent,
    ListaTapetesComponent,
    ItensTapeteComponent,
    EditarTapeteComponent,
    NovoTapeteComponent,
    MilimeterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
