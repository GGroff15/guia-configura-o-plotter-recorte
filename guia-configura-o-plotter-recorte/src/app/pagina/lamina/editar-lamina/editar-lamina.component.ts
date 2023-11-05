import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LaminaDto } from 'src/app/model/lamina-dto';
import { LaminaService } from 'src/app/services/lamina.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-lamina',
  templateUrl: './editar-lamina.component.html',
  styleUrls: ['./editar-lamina.component.css'],
})
export class EditerLaminaComponent {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: LaminaService
  ) {
    const id: number = this.route.snapshot.params['id'];

    let laminaDto: LaminaDto;
    
    this.service.obter(id).then((lamina) => {
      laminaDto = lamina;
    }).catch((erro) => {
      laminaDto = WebStorageUtil.get(Constants.LAMINA_KEY);
    });

    this.formData = formBuilder.group({
      cor: laminaDto.cor,
      tipoCorte: laminaDto.tipoCorte,
    });
  }
}
