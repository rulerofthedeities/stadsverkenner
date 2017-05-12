import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {Map, Marker} from '../../models/map.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <div *ngIf="dataLoaded">
    <div *ngFor="let line of address">
      {{line}}
    </div>
    <km-map
      [map]="map"
      [markers]="markers">
    </km-map>
  </div>
  `
})
export class ItemLocationComponent implements OnInit, OnDestroy {
  private componentActive = true;
  dataLoaded = false;
  address: string[];
  map: Map;
  markers: Marker[] = [];

  constructor(
    private router: Router,
    private itemService: ItemService,
    private errorService: ErrorService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.getRouterData();
  }

  getRouterData() {
    const paths = this.router.url.split('/');
    this.getLocationData(paths[1], paths[3]);
  }

  getLocationData(cityAlias, itemAlias) {
    this.itemService
    .getArticleLocation(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      locationData => {
        if (locationData.address) {
          this.address = this.itemService.getAddress(locationData.address);
        }
        let img = '';
        if (locationData.img) {
          const imgPath = this.globalService.imageHost + '/img/' + locationData.path + '/';
          img = imgPath + locationData.img + '.jpg';
        }
        this.map = {
          zoom: 16,
          lon: parseFloat(locationData.pos.coordinates[0]),
          lat: parseFloat(locationData.pos.coordinates[1])
        };
        const marker: Marker = {
          lon: parseFloat(locationData.pos.coordinates[0]),
          lat: parseFloat(locationData.pos.coordinates[1]),
          label: '',
          icon: '/assets/img/map/pin-red.png',
          url: '',
          isOpen: true,
          infoImg: img,
          infoTxt: locationData.title,
          address: this.itemService.getAddress(locationData.address)
        };
        this.markers.push(marker);
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
