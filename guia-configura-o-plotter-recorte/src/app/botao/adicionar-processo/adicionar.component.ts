import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent {

  constructor(private modal: ModalService) {

  }

  openModal() {
    this.modal.openModal();
  }

}
