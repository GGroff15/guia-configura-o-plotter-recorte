import { LaminaDto } from 'src/app/model/lamina-dto';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';
import * as M from 'materialize-css';
import { NovoProcessoComponent } from 'src/app/pagina/processo/novo-processo/novo-processo.component';
import { MaterialService } from 'src/app/services/material.service';
import { CanetaService } from 'src/app/services/caneta.service';
import { LaminaService } from 'src/app/services/lamina.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { TapetesService } from 'src/app/services/tapete.service';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { MaterialDto } from 'src/app/model/material-dto';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { ProcessoDto } from 'src/app/model/processo-dto';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild(NovoProcessoComponent) novoProcesso!: NovoProcessoComponent;

  @Input() novo: any;

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
}
