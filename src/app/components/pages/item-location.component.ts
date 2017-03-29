import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {Marker} from '../../models/map.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <div *ngIf="dataLoaded">
    <div *ngFor="let line of address">
      {{line}}
    </div>

    <div class="map">
      <sebm-google-map 
      [longitude]="location[0]"
      [latitude]="location[1]"
      [zoom]="zoom">

        <sebm-google-map-marker 
          [longitude]="location[0]"
          [latitude]="location[1]"
          [iconUrl]="imgPath + img + '.jpg'"
          [markerDraggable]="false">
          <sebm-google-map-info-window>
            <p>{{title}}</p>
          </sebm-google-map-info-window>
        </sebm-google-map-marker>

      </sebm-google-map>
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
  imgPath: string;
  address: string;
  location: any;
  zoom = 13;
  img: string;
  title: string;

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
        console.log('location data', locationData);
        this.location = locationData.pos.coordinates;
        this.title = locationData.title;
        if (locationData.address) {
          this.address = locationData.address.split(';');
        }
        if (locationData.img) {
          this.img = locationData.img;
        }
        this.imgPath = this.globalService.imageHost + '/img/' + locationData.path + '/';
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
