import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  tituloPagina = "Titulo Paagina";

  onContainerInit(data: string) {
    this.tituloPagina = data;
  }

}
