import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  openModal() {
    this.showModal.emit();
  }
}
