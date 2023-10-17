import { Component } from '@angular/core';
import { ModalService } from '../../item-processo/modal.service';

@Component({
  selector: 'app-adicionar-processo',
  templateUrl: './adicionar-processo.component.html',
  styleUrls: ['./adicionar-processo.component.css']
})
export class AdicionarProcessoComponent {

  constructor(private modal: ModalService) {

  }

  openModal() {
    this.modal.openModal();
  }

}
