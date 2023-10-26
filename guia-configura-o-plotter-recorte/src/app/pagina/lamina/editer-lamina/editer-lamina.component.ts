import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';

@Component({
  selector: 'app-editer-lamina',
  templateUrl: './editer-lamina.component.html',
  styleUrls: ['./editer-lamina.component.css'],
})
export class EditerLaminaComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: LaminaService
  ) {
    const id: number = this.route.snapshot.params['id'];
    const laminaDto: LaminaDto = this.service.obter(id);
    console.log(laminaDto);

    this.formData = formBuilder.group({
      cor: laminaDto.cor,
      tipoCorte: laminaDto.tipoCorte,
    });
  }
}
