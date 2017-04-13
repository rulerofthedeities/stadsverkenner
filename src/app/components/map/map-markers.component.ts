import {Component, Input} from '@angular/core';
import {Marker} from '../../models/map.model';

@Component({
  selector: 'km-map-markers',
  template: `
    <sebm-google-map-marker
      *ngFor="let m of markers; let i = index"
      (markerClick)="clickedMarker(m, i)"
      (markerMouseOver)="hoveredMarker(m, i)"
      (on-mouseover)="hoveredMarker(m, i)"
      [longitude]="m.lon"
      [latitude]="m.lat"
      [label]="m.label"
      [markerDraggable]="false"
      [iconUrl]="m.icon">
      <sebm-google-map-info-window>
        <p>{{markers.length > 1 ? i+1 + '.' : ''}} 
          <span *ngIf="m.url"><a href="{{m.url}}" target="_blank">{{m.infotxt}}</a></span>
          <span *ngIf="!m.url">{{m.infotxt}}</span>
        </p>
      </sebm-google-map-info-window>
    </sebm-google-map-marker>`
})

export class MapMarkersComponent {
  @Input() markers: Marker[];

  clickedMarker(m: Marker, i: number) {
    console.log('clicked', m, i);
  }
  hoveredMarker(m: Marker, i: number) {
    console.log('hovered', m, i);
  }
}
