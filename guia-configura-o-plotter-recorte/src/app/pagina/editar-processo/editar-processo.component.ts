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
    const processoDto: ProcessoDto = this.processoService.obter(idProcesso);
    console.log(processoDto);

    this.canetas = canetaService.listar();
    this.materiais = materialService.listar();
    this.tapetes = tapeteService.listar();
    this.laminas = laminaService.listar();
    this.formData = this.formBuilder.group({
      canetaSelecionada: processoDto.canetaDto.codigo,
      materialSelecionado: processoDto.materialDto.codigo,
      tapeteSelecionado: processoDto.tapeteDto.codigo,
      laminaSelecionado: processoDto.laminaDto.codigo,
      profundidadeLamina: processoDto.profundidadeLamina,
      pressaoFerramenta: processoDto.pressaoFerramenta,
      tipoProcesso: processoDto.tipo,
      tecido: processoDto.tecido,
    });
  }
}
