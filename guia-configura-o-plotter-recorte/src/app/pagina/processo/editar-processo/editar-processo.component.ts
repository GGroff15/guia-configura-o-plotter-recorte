import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { MaterialDto } from 'src/app/model/material-dto';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { LaminaService } from 'src/app/services/lamina.service';
import { MaterialService } from 'src/app/services/material.service';
import { ProcessoService } from 'src/app/services/processo.service';
import { TapetesService } from 'src/app/services/tapete.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-processo',
  templateUrl: './editar-processo.component.html',
  styleUrls: ['./editar-processo.component.css'],
})
export class EditarProcessoComponent {
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
    private route: ActivatedRoute,
    private processoService: ProcessoService
  ) {
    const idProcesso: number = this.route.snapshot.params['id'];

    let processoDto: ProcessoDto;

    this.processoService
      .obter(idProcesso)
      .then((processo) => (processoDto = processo));

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
      canetaSelecionada: processoDto.canetaDto.id,
      materialSelecionado: processoDto.materialDto.id,
      tapeteSelecionado: processoDto.tapeteDto.id,
      laminaSelecionado: processoDto.laminaDto.id,
      profundidadeLamina: processoDto.profundidadeLamina,
      pressaoFerramenta: processoDto.pressaoFerramenta,
      tipoProcesso: processoDto.tipo,
      tecido: processoDto.tecido,
    });
  }
}
