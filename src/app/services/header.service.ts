import {EventEmitter} from '@angular/core';

export class HeaderService {
  newTitle = new EventEmitter<string>();

  setTitle(name: string) {
    this.newTitle.emit(name);
  }
}
