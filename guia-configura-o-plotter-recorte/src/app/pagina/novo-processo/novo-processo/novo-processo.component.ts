import { MaterialService } from './../../../services/material.service';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { MaterialDto } from 'src/app/model/material-dto';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { LaminaService } from 'src/app/services/lamina.service';
import { TapetesService } from 'src/app/services/tapete.service';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css']
})
export class NovoProcessoComponent implements OnInit {
  
  canetaSelecionada: string = 'Selecione uma caneta';
  canetas: CanetaDto[];

  materialSelecionado: string = 'Selecione um material';
  materiais: MaterialDto[];

  tapeteSelecionado: string = 'Selecione um tapete';
  tapetes: TapeteDto[];

  laminaSelecionado: string = 'Selecione uma lâmina';
  laminas: LaminaDto[];

  tipoProcesso: string;

  constructor(private canetaService: CanetaService, private materialService: MaterialService, private tapeteService: TapetesService, private laminaService: LaminaService) {
    this.canetas = canetaService.listar();
    this.materiais = materialService.listar();
    this.tapetes  = tapeteService.listar();
    this.laminas = laminaService.listar();
    this.tipoProcesso = "Corte";
  }

  ngOnInit(): void {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

  onChangeTipoProcesso(opcao: string) {
    this.tipoProcesso = opcao;
  }

}
