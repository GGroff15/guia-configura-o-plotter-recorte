import { Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent {

  @Output() dataEvent = new EventEmitter<string>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  changeFilter(option:string) {
    const links = this.elementRef.nativeElement.querySelectorAll('a');

    links.forEach((link: ElementRef) => {
      this.renderer.removeClass(link, 'primary');
    });

    const selectedButton = this.elementRef.nativeElement.querySelector('#' + option);
    this.renderer.addClass(selectedButton, 'primary');

    this.dataEvent.emit(option);

  }

}
