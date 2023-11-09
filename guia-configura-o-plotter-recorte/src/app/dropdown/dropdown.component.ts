import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  editar() {
    this.editEvent.emit(this.item.id);
  }

  remover() {
    this.removeEvent.emit(this.item.id);
  }
}
