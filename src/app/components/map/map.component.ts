import {Component, Input, EventEmitter} from '@angular/core';
import {MapService} from '../../services/map.service';
import {Marker, Map} from '../../models/map.model';

@Component({
  selector: 'km-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent {
  @Input() map: Map;
  @Input() markers: Marker[];
  @Input() showItems = false;

  constructor(
    private mapService: MapService
  ) {}

  onClick(index: number) {
    console.log('clicked ', index);
    this.mapService.selectMarker(index);
  }
}
