import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent implements OnInit {
  
  canetaSelecionada: string = 'Selecione uma caneta';
  canetas: CanetaDto[];

  constructor(private canetaService: CanetaService) {
    this.canetas = canetaService.listar();
    console.log(this.canetas);
  }

  ngOnInit(): void {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

}
