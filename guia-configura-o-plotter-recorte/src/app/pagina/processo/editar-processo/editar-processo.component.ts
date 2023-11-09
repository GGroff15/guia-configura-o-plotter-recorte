import { ProcessoDto } from './../../../model/processo-dto';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { MaterialDto } from 'src/app/model/material-dto';
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
export class EditarProcessoComponent implements OnInit {
  canetas: CanetaDto[];

  materiais: MaterialDto[];

  tapetes: TapeteDto[];

  laminas: LaminaDto[];

  formData: FormGroup;

  processoDto: ProcessoDto;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private canetaService: CanetaService,
    private materialService: MaterialService,
    private tapeteService: TapetesService,
    private laminaService: LaminaService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private processoService: ProcessoService
  ) {
    this.popularSelectCanetas();
    this.popularSelectMateriais();
    this.popularSelectTapetes();
    this.popularSelectLaminas();
  }

  private popularSelectCanetas() {
    this.canetaService
      .listar()
      .then((canetas) => (this.canetas = canetas))
      .catch(
        (error) => (this.canetas = WebStorageUtil.get(Constants.CANETA_KEY))
      );
  }

  private popularSelectMateriais() {
    this.materialService
      .listar()
      .then((materiais) => (this.materiais = materiais))
      .catch(
        (erro) => (this.materiais = WebStorageUtil.get(Constants.MATERIAL_KEY))
      );
  }

  private popularSelectTapetes() {
    this.tapeteService
      .listar()
      .then((tapetes) => (this.tapetes = tapetes))
      .catch(
        (erro) => (this.tapetes = WebStorageUtil.get(Constants.TAPETE_KEY))
      );
  }

  private popularSelectLaminas() {
    this.laminaService
      .listar()
      .then((laminas) => (this.laminas = laminas))
      .catch(
        (erro) => (this.laminas = WebStorageUtil.get(Constants.LAMINA_KEY))
      );
  }

  ngOnInit(): void {
    this.criarFormulario();

    const idProcesso: number = this.route.snapshot.params['id'];
    this.obterProcesso(idProcesso);
  }

  private criarFormulario() {
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
      ?.valueChanges.subscribe((selectedOption): void =>
        this.atualizarValidatorsFormulario(selectedOption)
      );
  }

  private atualizarValidatorsFormulario(selectedOption: any) {
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
  }

  obterProcesso(id: number) {
    this.processoService.obter(id).then((processo) => {
      this.processoDto = processo;

      this.formData.patchValue({
        materialSelecionado: this.findInList(
          this.processoDto.materialDto,
          this.materiais
        ),
        tapeteSelecionado: this.findInList(
          this.processoDto.tapeteDto,
          this.tapetes
        ),

        profundidadeLamina: this.processoDto.profundidadeLamina,
        pressaoFerramenta: this.processoDto.pressaoFerramenta,
        tipoProcesso: this.processoDto.tipo,
        tecido: this.processoDto.tecido,
      });

      if (this.processoDto.canetaDto) {
        this.formData.patchValue({
          canetaSelecionada: this.findInList(
            this.processoDto.canetaDto,
            this.canetas
          ),
        });
      }

      if (this.processoDto.laminaDto) {
        this.formData.patchValue({
          laminaSelecionado: this.findInList(
            this.processoDto.laminaDto,
            this.laminas
          ),
        });
      }

      this.cdr.detectChanges();

    });
  }

  findInList(item: any, list: any[]): any {
    return list.find((listItem) => listItem.id === item.id);
  }

  salvar() {
    const profundidadeLamina: number = this.convertToNumber(
      this.formData.value.profundidadeLamina
    );

    const pressaoFerramenta: number = this.convertToNumber(
      this.formData.value.pressaoFerramenta
    );

    const tipoProcesso: string = this.formData.value.tipoProcesso;

    const tecido: boolean = this.formData.value.tecido;

    const processo: ProcessoDto = {
      id: this.processoDto.id,
      materialDto: this.formData.value.materialSelecionado,
      tapeteDto: this.formData.value.tapeteSelecionado,
      canetaDto: this.formData.value.canetaSelecionada,
      pressaoFerramenta: pressaoFerramenta,
      tipo: tipoProcesso,
      laminaDto: this.formData.value.laminaSelecionado,
      profundidadeLamina: profundidadeLamina,
      tecido: tecido,
    };

    this.processoService
      .atualizar(processo)
      .then((processo) => {
        this.router.navigate(['/processos']);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  private convertToNumber(id: string): number {
    const number: number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
