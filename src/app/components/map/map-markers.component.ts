import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MapService} from '../../services/map.service';
import {Marker} from '../../models/map.model';

@Component({
  selector: 'km-map-markers',
  templateUrl: 'map-markers.component.html',
  styleUrls: ['map-markers.component.css']
})

export class MapMarkersComponent implements OnInit {
  @Input() markers: Marker[];

  constructor(
    private router: Router,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.mapService.markerSelected.subscribe(
      index => {
        this.closeOpenWindows();
        // item name was clicked, open window
        this.markers[index].isOpen = true;
      }
    );
  }

  clickedMarker(m: Marker, i: number) {
    if (m.url) {
      this.router.navigate([m.url]);
    }
  }

  hoveredMarker(m: Marker, i: number) {
    this.closeOpenWindows();
    // open hovered window
    m.isOpen = true;
  }

  closeOpenWindows() {
    // close open windows
    const toClose: Marker[] = this.markers.filter(marker => marker.isOpen);
    toClose.forEach(marker => marker.isOpen = false);
  }
}
