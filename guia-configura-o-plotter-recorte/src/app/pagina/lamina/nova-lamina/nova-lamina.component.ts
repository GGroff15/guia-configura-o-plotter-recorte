import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { CanetaService } from 'src/app/services/caneta.service';
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
      cor: '',
      tipoCorte: '',
    });
  }

  salvar() {
    const formData = this.formData;
    const cor = formData.value.cor;
    const tipoCorte = formData.value.tipoCorte;
    const lamina: LaminaDto = {
      codigo: 0,
      cor: cor,
      tipoCorte: tipoCorte,
    };

    this.service.salvar(lamina);
  }

}
