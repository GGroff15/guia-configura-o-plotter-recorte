import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { TapetesService } from 'src/app/services/tapete.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-tapete',
  templateUrl: './editar-tapete.component.html',
  styleUrls: ['./editar-tapete.component.css'],
})
export class EditarTapeteComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: TapetesService
  ) {
    const id: number = this.route.snapshot.params['id'];
    let tapeteDto: TapeteDto;

    this.service
      .obter(id)
      .then((tapete) => (tapeteDto = tapete))
      .catch((erro) => (tapeteDto = WebStorageUtil.get(Constants.TAPETE_KEY)));

    this.formData = formBuilder.group({
      cor: tapeteDto.cor,
      forcaAderencia: tapeteDto.forcaAderencia,
    });
  }
}
