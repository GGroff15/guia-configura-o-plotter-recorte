import { LaminaDto } from 'src/app/model/lamina-dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal.service';
import * as M from 'materialize-css';
import { NovoProcessoComponent } from 'src/app/pagina/novo-processo/novo-processo/novo-processo.component';
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

  constructor(private service: ModalService,
    private materialService: MaterialService,
    private canetaService: CanetaService,
    private laminaService: LaminaService,
    private processoService: ProcessoService,
    private tapeteService: TapetesService) {}

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
