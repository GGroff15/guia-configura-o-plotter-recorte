import { MaterialService } from '../../../services/material.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import * as M from 'materialize-css';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { MaterialDto } from 'src/app/model/material-dto';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { LaminaService } from 'src/app/services/lamina.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { TapetesService } from 'src/app/services/tapete.service';

@Component({
  selector: 'app-novo-processo',
  templateUrl: './novo-processo.component.html',
  styleUrls: ['./novo-processo.component.css'],
})
export class NovoProcessoComponent implements OnInit {
  canetas: CanetaDto[];
  
  materiais: MaterialDto[];
  
  tapetes: TapeteDto[];
  
  laminas: LaminaDto[];
  
  formData: FormGroup;
  
  constructor(
    private canetaService: CanetaService,
    private materialService: MaterialService,
    private tapeteService: TapetesService,
    private laminaService: LaminaService,
    private formBuilder: FormBuilder,
    private processoService: ProcessoService
    ) {
      this.canetas = canetaService.listar();
      this.materiais = materialService.listar();
      this.tapetes = tapeteService.listar();
      this.laminas = laminaService.listar();
      this.formData = this.formBuilder.group({
        canetaSelecionada: 'Selecione uma caneta',
        materialSelecionado: 'Selecione um material',
        tapeteSelecionado: 'Selecione um tapete',
        laminaSelecionado: 'Selecione uma lâmina',
        profundidadeLamina: '',
        pressaoFerramenta: '',
        tipoProcesso: 'Corte',
        tecido: false
    });
  }

  ngOnInit(): void {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

  getFormData(): AbstractControl<any, any> {
    return this.formData;
  }

  salvar(): void {
    const formData = this.getFormData();
    
    const idCaneta: number = this.convertToNumber(formData.value.canetaSelecionada);
    const canetaDto: CanetaDto = this.canetaService.obter(idCaneta);

    const idMaterial: number = this.convertToNumber(formData.value.materialSelecionado);
    const materialDto: MaterialDto = this.materialService.obter(idMaterial);

    const idTapete: number = this.convertToNumber(formData.value.tapeteSelecionado);
    const tapeteDto: TapeteDto = this.tapeteService.obter(idTapete);

    const idLamina: number = this.convertToNumber(formData.value.laminaSelecionado);
    const laminaDto: LaminaDto = this.laminaService.obter(idLamina);

    const profundidadeLamina: number = this.convertToNumber(formData.value.profundidadeLamina);
    
    const pressaoFerramenta: number = this.convertToNumber(formData.value.pressaoFerramenta);

    const tipoProcesso: string = formData.value.tipoProcesso;

    const tecido: boolean = formData.value.tecido;

    const processo: ProcessoDto = {
      codigo: 0,
      materialDto: materialDto,
      tapeteDto: tapeteDto,
      canetaDto: canetaDto,
      pressaoFerramenta: pressaoFerramenta,
      tipo: tipoProcesso,
      laminaDto: laminaDto,
      profundidadeLamina: profundidadeLamina,
      tecido: tecido
    };

    this.processoService.salver(processo);
  }

  private convertToNumber(id: string): number {
    const number:number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
