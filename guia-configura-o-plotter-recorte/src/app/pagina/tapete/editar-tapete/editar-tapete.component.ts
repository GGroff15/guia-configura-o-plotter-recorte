import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TapeteDto } from 'src/app/model/tapete-dto';
import { TapetesService } from 'src/app/services/tapete.service';
import { Constants } from 'src/app/utils/constantes';
import { WebStorageUtil } from 'src/app/utils/webStorageUtils';

@Component({
  selector: 'app-editar-tapete',
  templateUrl: './editar-tapete.component.html',
  styleUrls: ['./editar-tapete.component.css'],
})
export class EditarTapeteComponent implements OnInit {
  formData: FormGroup;
  tapeteDto: TapeteDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: TapetesService
  ) {}
  ngOnInit(): void {
    this.criarFormulario();

    const id: number = this.route.snapshot.params['id'];

    this.service
      .obter(id)
      .then((tapete) => (this.tapeteDto = tapete))
      .catch(
        (erro) => (this.tapeteDto = WebStorageUtil.get(Constants.TAPETE_KEY))
      )
      .finally(() => {
        this.formData.patchValue({
          cor: this.tapeteDto.cor,
          forcaAderencia: this.tapeteDto.forcaAderencia,
        });
      });
  }

  private criarFormulario() {
    this.formData = this.formBuilder.group({
      cor: ['', [Validators.required]],
      forcaAderencia: ['', Validators.required],
    });
  }

  salvar() {
    const formData = this.formData;
    const cor = formData.value.cor;
    const forcaAderencia = formData.value.forcaAderencia;
    const tapete: TapeteDto = {
      id: this.tapeteDto.id,
      cor: cor,
      forcaAderencia: forcaAderencia,
    };

    this.service.atualizar(tapete).then((tapete) => {
      this.router.navigate(['/tapetes']);
    }).catch((erro) => {
      console.log(erro)
    });
  }
}
