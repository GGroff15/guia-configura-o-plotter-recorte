import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanetaDto } from 'src/app/model/caneta-dto';
import { CanetaService } from 'src/app/services/caneta.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-caneta',
  templateUrl: './editar-caneta.component.html',
  styleUrls: ['./editar-caneta.component.css'],
})
export class EditarCanetaComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: CanetaService
  ) {
    const idCaneta: number = this.route.snapshot.params['id'];

    let canetaDto: CanetaDto;

    this.service
      .obter(idCaneta)
      .then((caneta) => (canetaDto = caneta))
      .catch((erro) => (canetaDto = WebStorageUtil.get(Constants.CANETA_KEY)));

    this.formData = formBuilder.group({
      espessura: canetaDto.espessura,
    });
  }
}
