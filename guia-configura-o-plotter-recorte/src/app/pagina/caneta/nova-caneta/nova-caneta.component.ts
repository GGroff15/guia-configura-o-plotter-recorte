import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { ListaCanetasService } from '../lista-canetas.service';

@Component({
  selector: 'app-nova-caneta',
  templateUrl: './nova-caneta.component.html',
  styleUrls: ['./nova-caneta.component.css'],
})
export class NovaCanetaComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ListaCanetasService
  ) {
    this.formData = this.formBuilder.group({
      espessura: ['', [Validators.required]],
    });
  }

  getValidForm() {
    return this.formData.valid;
  }

  salvar() {
    const formData = this.formData;
    const espessura: number = this.convertToNumber(formData.value.espessura);
    const caneta: CanetaDto = {
      id: 0,
      espessura: espessura,
    };

    this.service.salvar(caneta);
  }

  private convertToNumber(id: string): number {
    const number: number = parseInt(id, 10);
    return isNaN(number) ? 0 : number;
  }
}
