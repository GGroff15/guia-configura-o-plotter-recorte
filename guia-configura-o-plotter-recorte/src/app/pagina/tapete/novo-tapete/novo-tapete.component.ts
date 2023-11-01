import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { TapetesService } from 'src/app/services/tapete.service';

@Component({
  selector: 'app-novo-tapete',
  templateUrl: './novo-tapete.component.html',
  styleUrls: ['./novo-tapete.component.css'],
})
export class NovoTapeteComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: TapetesService
  ) {
    this.formData = formBuilder.group({
      cor: ['', [Validators.required]],
      forcaAderencia: ['', [Validators.required]],
    });
  }

  getValidForm() {
    return this.formData.valid;
  }

  salvar() {
    const formData = this.formData;
    const cor = formData.value.cor;
    const forcaAderencia = formData.value.forcaAderencia;
    const tapete: TapeteDto = {
      codigo: 0,
      cor: cor,
      forcaAderencia: forcaAderencia,
    };

    this.service.salvar(tapete);
  }
}
