import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() item: any;
  @Output() removeEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();

  isDropdownOpen = false;

  constructor(private el: ElementRef) {

  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editar() {
    this.editEvent.emit(this.item.id);
  }

  remover() {
    this.removeEvent.emit(this.item.id);
  }
}
