import { Component } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';
import { ProcessoService } from 'src/app/services/processo.service';

@Component({
  selector: 'app-item-processo',
  templateUrl: './item-processo.component.html',
  styleUrls: ['./item-processo.component.css']
})
export class ItemProcessoComponent {

  processos: ProcessoDto[];

  constructor(private service : ProcessoService) {
    this.processos = service.listar('Todos');
    console.log(this.processos);
  }
  ngOnInit(): void {
    const collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible);
  }

}
