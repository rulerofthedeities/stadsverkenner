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
    <div class="map">
      <km-map
        [map]="map"
        [markers]="markers">
      </km-map>
    </div>
  </div>

  `,
  styles: [`
    .sebm-google-map-container {
      height: 600px;
    }
    .map {
      border: 1px solid #538f18;
      margin: 2px 0 4px 0;
    }
  `]
})
export class ItemLocationComponent implements OnInit, OnDestroy {
  private componentActive = true;
  dataLoaded = false;
  // imgPath: string;
  address: string;
  // location: any;
  // zoom = 13;
  // img: string;
  // title: string;
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
          this.address = locationData.address.split(';');
        }
        let img = '';
        if (locationData.img) {
          const imgPath = this.globalService.imageHost + '/img/' + locationData.path + '/';
          img = imgPath + locationData.img + '.jpg';
        }
        this.map = {
          zoom: 16,
          lon: locationData.pos.coordinates[0],
          lat: locationData.pos.coordinates[1]
        };
        const marker: Marker = {
          lon: locationData.pos.coordinates[0],
          lat: locationData.pos.coordinates[1],
          label: '',
          icon: img,
          url: '',
          infotxt: locationData.title
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
