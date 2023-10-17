import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'
import { ModalService } from '../../item-processo/modal.service';

@Component({
  selector: 'app-adicionar-processo-floating',
  templateUrl: './adicionar-processo-floating.component.html',
  styleUrls: ['./adicionar-processo-floating.component.css']
})
export class AdicionarProcessoFloatingComponent implements OnInit {

  constructor(private modal: ModalService) {

  }

  ngOnInit(): void {
    const button = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(button);
  }

  openModal() {
    this.modal.openModal();
  }

}
