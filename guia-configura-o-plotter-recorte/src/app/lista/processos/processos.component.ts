import { ProcessoService } from 'src/app/services/processo.service';
import { ProcessoDto } from './../../model/processo-dto';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.css']
})
export class ProcessosComponent {

  @Output() dataEvent = new EventEmitter<string>();

  itens: ProcessoDto[];

  constructor(private service: ProcessoService) {
    this.itens = service.listar('todos');
    this.dataEvent.emit('Processos');
  }

  onFiltroChange(data: string) {
    console.log(`Filtro desejado: ${data}`);
    this.itens = this.service.listar(data);
  }

}
