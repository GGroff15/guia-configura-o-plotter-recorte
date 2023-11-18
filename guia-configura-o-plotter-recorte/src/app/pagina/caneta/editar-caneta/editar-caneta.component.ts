import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-caneta',
  templateUrl: './editar-caneta.component.html',
  styleUrls: ['./editar-caneta.component.css'],
})
export class EditarCanetaComponent implements OnInit {
  formData: FormGroup;

  canetaDto: CanetaDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: CanetaService
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    const idCaneta: number = this.route.snapshot.params['id'];

    this.service
      .obter(idCaneta)
      .then((caneta) => {
        this.canetaDto = caneta;
      })
      .catch(
        (erro) => (this.canetaDto = WebStorageUtil.get(Constants.CANETA_KEY))
      )
      .finally(() => {
        this.formData.patchValue({
          espessura: this.canetaDto.espessura,
        });
      });
  }

  private criarFormulario() {
    this.formData = this.formBuilder.group({
      espessura: ['', [Validators.required]],
    });
  }

  salvar() {
    const formData = this.formData;
    const espessura: number = this.convertToNumber(formData.value.espessura);
    const caneta: CanetaDto = {
      id: this.canetaDto.id,
      espessura: espessura,
    };

    this.service.atualizar(caneta).then((caneta) => {
      this.router.navigate(['/canetas']);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  private convertToNumber(id: string): number {
    const number: number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
