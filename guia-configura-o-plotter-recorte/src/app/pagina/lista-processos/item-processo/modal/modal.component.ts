import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal.service';
import * as M from 'materialize-css';
import { NovoProcessoComponent } from 'src/app/pagina/novo-processo/novo-processo/novo-processo.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild(NovoProcessoComponent) novoProcesso!: NovoProcessoComponent;

  constructor(private service: ModalService) {}

  ngOnInit(): void {
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    this.service.showModal.subscribe(() => {
      const modal = document.querySelector('.modal');
      if (modal !== null) {
        const instance = M.Modal.getInstance(modal);
        instance.open();
      }
    });
  }

  salvar() {
    const formData = this.novoProcesso.getFormData();
    console.log(formData);
  }

}
