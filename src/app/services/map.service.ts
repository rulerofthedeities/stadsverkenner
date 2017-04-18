import {EventEmitter} from '@angular/core';

export class MapService {
  markerSelected = new EventEmitter<number>();

  selectMarker(index: number) {
    this.markerSelected.emit(index);
  }
}
