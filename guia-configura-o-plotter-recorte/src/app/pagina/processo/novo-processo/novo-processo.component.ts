import { MaterialService } from '../../../services/material.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';
import { ListaCanetasService } from '../../caneta/lista-canetas.service';
import { ListaTapetesService } from '../../tapete/lista-tapetes.service';
import { ListaLaminasService } from '../../lamina/lista-laminas.service';
import { ListaProcessosService } from '../lista-processos.service';

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
    private canetaService: ListaCanetasService,
    private materialService: MaterialService,
    private tapeteService: ListaTapetesService,
    private laminaService: ListaLaminasService,
    private processoService: ListaProcessosService,
    private formBuilder: FormBuilder,
  ) {
    canetaService
      .listar()
      .then((canetas) => (this.canetas = canetas))
      .catch(
        (error) => (this.canetas = WebStorageUtil.get(Constants.CANETA_KEY))
      );
    materialService
      .listar()
      .then((materiais) => (this.materiais = materiais))
      .catch(
        (erro) => (this.materiais = WebStorageUtil.get(Constants.MATERIAL_KEY))
      );
    tapeteService
      .listar()
      .then((tapetes) => (this.tapetes = tapetes))
      .catch(
        (erro) => (this.tapetes = WebStorageUtil.get(Constants.TAPETE_KEY))
      );

    laminaService
      .listar()
      .then((laminas) => (this.laminas = laminas))
      .catch(
        (erro) => (this.laminas = WebStorageUtil.get(Constants.LAMINA_KEY))
      );

    this.formData = this.formBuilder.group({
      materialSelecionado: [null, [Validators.required]],
      tapeteSelecionado: [null, [Validators.required]],
      pressaoFerramenta: ['', [Validators.required]],
      canetaSelecionada: [null, []],
      laminaSelecionado: [null, [Validators.required]],
      profundidadeLamina: ['', [Validators.required]],
      tipoProcesso: ['Corte'],
      tecido: false,
    });

    this.formData
      .get('tipoProcesso')
      ?.valueChanges.subscribe((selectedOption) => {
        if (selectedOption === 'Corte') {
          this.formData
            .get('laminaSelecionado')
            ?.setValidators([Validators.required]);
          this.formData
            .get('profundidadeLamina')
            ?.setValidators([Validators.required]);
          this.formData.get('canetaSelecionada')?.clearValidators();
        } else {
          this.formData.get('laminaSelecionado')?.clearValidators();
          this.formData.get('profundidadeLamina')?.clearValidators();
          this.formData
            .get('canetaSelecionada')
            ?.setValidators([Validators.required]);
        }
        this.formData.get('laminaSelecionado')?.updateValueAndValidity();
        this.formData.get('profundidadeLamina')?.updateValueAndValidity();
      });
  }

  ngOnInit(): void {
    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);
  }

  getFormData(): AbstractControl<any, any> {
    return this.formData;
  }

  getValidForm() {
    return this.formData.valid;
  }

  salvar(): void {
    const formData = this.getFormData();

    const profundidadeLamina: number = this.convertToNumber(
      formData.value.profundidadeLamina
    );

    const pressaoFerramenta: number = this.convertToNumber(
      formData.value.pressaoFerramenta
    );

    const tipoProcesso: string = formData.value.tipoProcesso;

    const tecido: boolean = formData.value.tecido;

    const processo: ProcessoDto = {
      id: 0,
      materialDto: formData.value.materialSelecionado,
      tapeteDto: formData.value.tapeteSelecionado,
      canetaDto: formData.value.canetaSelecionada,
      pressaoFerramenta: pressaoFerramenta,
      tipo: tipoProcesso,
      laminaDto: formData.value.laminaSelecionado,
      profundidadeLamina: profundidadeLamina,
      tecido: tecido,
    };

    this.processoService.salvar(processo);
  }

  private convertToNumber(id: string): number {
    const number: number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
