import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-adicionar-floating',
  templateUrl: './adicionar-floating.component.html',
  styleUrls: ['./adicionar-floating.component.css']
})
export class AdicionarFloatingComponent implements OnInit {

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
