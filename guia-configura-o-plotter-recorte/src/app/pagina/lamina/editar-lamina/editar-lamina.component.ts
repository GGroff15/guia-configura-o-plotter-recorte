import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-lamina',
  templateUrl: './editar-lamina.component.html',
  styleUrls: ['./editar-lamina.component.css'],
})
export class EditerLaminaComponent implements OnInit {
  formData: FormGroup;
  laminaDto: LaminaDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: LaminaService
  ) {
    
  }

  ngOnInit(): void {
    this.criarFormulario();

    const id: number = this.route.snapshot.params['id'];

    
    this.service.obter(id).then((lamina) => {
      this.laminaDto = lamina;
    }).catch((erro) => {
      this.laminaDto = WebStorageUtil.get(Constants.LAMINA_KEY);
    }).finally(() => {
      this.formData.patchValue({
        cor: this.laminaDto.cor,
        tipoCorte: this.laminaDto.tipoCorte,
      });
    });

  }

  private criarFormulario() {
    this.formData = this.formBuilder.group({
      cor: ['', Validators.required],
      tipoCorte: ['', Validators.required],
    });
  }

  salvar() {
    const formData = this.formData;
    const cor = formData.value.cor;
    const tipoCorte = formData.value.tipoCorte;
    const lamina: LaminaDto = {
      id: this.laminaDto.id,
      cor: cor,
      tipoCorte: tipoCorte,
    };

    this.service.atualizar(lamina).then((lamina) => {
      this.router.navigate(['/laminas']);
    }).catch((erro) => {
      console.log(erro)
    });
  }

  private convertToNumber(id: string): number {
    const number: number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
