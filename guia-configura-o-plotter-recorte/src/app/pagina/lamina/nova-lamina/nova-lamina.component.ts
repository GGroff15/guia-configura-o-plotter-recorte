import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';

@Component({
  selector: 'app-nova-lamina',
  templateUrl: './nova-lamina.component.html',
  styleUrls: ['./nova-lamina.component.css']
})
export class NovaLaminaComponent {

  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LaminaService
  ) {
    this.formData = this.formBuilder.group({
      cor: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      tipoCorte: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
    });
  }

  getValidForm() {
    return this.formData.valid;
  }

  salvar() {
    const formData = this.formData;
    const cor = formData.value.cor;
    const tipoCorte = formData.value.tipoCorte;
    const lamina: LaminaDto = {
      id: 0,
      cor: cor,
      tipoCorte: tipoCorte,
    };

    this.service.salvar(lamina);
  }

}
