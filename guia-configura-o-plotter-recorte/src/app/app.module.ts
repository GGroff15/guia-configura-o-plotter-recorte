import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraNavegacaoLateralComponent } from './barra-navegacao-lateral/barra-navegacao-lateral.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { ContainerComponent } from './container/container.component';
import { ProcessosComponent } from './lista/processos/processos.component';
import { FiltroComponent } from './lista/processos/filtro/filtro.component';
import { ItemComponent } from './lista/processos/item/item.component';
import { BotaoAdicionarComponent } from './lista/botao-adicionar/botao-adicionar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoLateralComponent,
    BarraSuperiorComponent,
    ContainerComponent,
    ProcessosComponent,
    FiltroComponent,
    ItemComponent,
    BotaoAdicionarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
