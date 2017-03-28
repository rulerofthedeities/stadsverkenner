import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <div *ngIf="dataLoaded">
    <div *ngFor="let line of address">
      {{line}}
    </div>

    <sebm-google-map 
    [longitude]="location[0]"
    [latitude]="location[1]"
    [zoom]="zoom">

    </sebm-google-map>

  </div>

  `,
  styles: [`
    .sebm-google-map-container {
      height: 600px;
    }
  `]
})
export class ItemLocationComponent implements OnInit, OnDestroy {
  private componentActive = true;
  dataLoaded = false;
  imgPath: string;
  address: string;
  location: any;
  zoom = 12;
  
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
        this.location = locationData.pos.coordinates;
        console.log('location data', locationData, this.location.length);
        if (locationData.address) {
          this.address = locationData.address.split(';');
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
