import {Component, Input} from '@angular/core';
import {Marker, Map} from '../../models/map.model';

@Component({
  selector: 'km-map',
  template: `
    <sebm-google-map 
      [longitude]="map.lon"
      [latitude]="map.lat"
      [zoom]="map.zoom">

      <km-map-markers *ngIf="markers"
        [markers]="markers">
      </km-map-markers>

    </sebm-google-map>`,
  styles: [`
    .sebm-google-map-container {
      height: 600px;
    }
  `]
})

export class MapComponent {
  @Input() map: Map;
  @Input() markers: Marker[];

}
