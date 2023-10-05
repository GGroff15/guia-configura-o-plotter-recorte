import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraNavegacaoLateralComponent } from './barra-navegacao-lateral/barra-navegacao-lateral.component';
import { ItemMenuComponent } from './barra-navegacao-lateral/item-menu/item-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoLateralComponent,
    ItemMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
