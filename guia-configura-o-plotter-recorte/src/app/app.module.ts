import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { ContainerComponent } from './container/container.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    ContainerComponent,
    BarraInferiorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
