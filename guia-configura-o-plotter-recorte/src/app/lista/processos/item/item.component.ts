import { Component, Renderer2, ElementRef, Input } from '@angular/core';
import { ProcessoDto } from 'src/app/model/processo-dto';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {

  @Input({ required: true })
  processo!: ProcessoDto;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  changeRoundBorder(event: MouseEvent) {
    const elementoClicado = event.target as HTMLElement;

    if (elementoClicado.classList.contains('round')) {
      this.renderer.removeClass(elementoClicado, 'round');
      this.renderer.addClass(elementoClicado, 'top-round');
    } else {
      this.renderer.removeClass(elementoClicado, 'top-round');
      this.renderer.addClass(elementoClicado, 'round');
    }
  }
}
