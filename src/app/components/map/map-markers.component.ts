import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Marker} from '../../models/map.model';

@Component({
  selector: 'km-map-markers',
  templateUrl: 'map-markers.component.html',
  styleUrls: ['map-markers.component.css']
})

export class MapMarkersComponent {
  @Input() markers: Marker[];

  constructor(
    private router: Router
  ) {}

  clickedMarker(m: Marker, i: number) {
    console.log('clicked', m, i);
    if (m.url) {
      this.router.navigate([m.url]);
    }
  }

  hoveredMarker(m: Marker, i: number) {
    // close open windows
    const toClose: Marker[] = this.markers.filter(marker => marker.isOpen);
    toClose.forEach(marker => marker.isOpen = false);
    // open hovered window
    m.isOpen = true;
  }
}
