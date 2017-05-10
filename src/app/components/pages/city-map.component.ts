import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ItemService} from '../../services/item.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city.model';
import {Map, Marker} from '../../models/map.model';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <div *ngIf="markersDone && map">
    <km-map 
      [map]="map"
      [markers]="markers"
      [showItems]="true">
    </km-map>
  </div>
  `
})
export class CityMapComponent implements OnInit, OnDestroy {
  componentActive = true;
  city: City;
  map: Map;
  markers: Marker[] = [];
  imgHost: string;
  markersDone = false;

  constructor(
    private itemService: ItemService,
    private cityService: CityService,
    private globalService: GlobalService,
    private errorService: ErrorService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.imgHost = this.globalService.imageHost;
    this.getCityAlias();
  }

  getCityAlias() {
    this.router.events
    .takeWhile(() => this.componentActive)
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      this.route.root.children.forEach(route => {
        if (route.outlet === 'primary') {
          const cityAlias = route.snapshot.url[0].path;
          this.fetchCity(cityAlias);
          this.fetchArticles(cityAlias);
        }
      });
    });
  }

  fetchCity(cityAlias: string) {
    this.cityService
    .getCity(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.city = data;
        this.map = {
          zoom: parseInt(this.city.zoom, 10),
          lon: data.pos[0],
          lat: data.pos[1]
        };
        this.titleService.setTitle('Kaart met bezienswaardigheden in ' + data['name']['nl']);
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchArticles(cityAlias: string) {
    this.itemService
    .getArticlesMap(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      articles => this.createMarkers(articles),
      error => this.errorService.handleError(error)
    );
  }

  createMarkers(articles: any[]) {
    let marker: Marker;
    const img_blue = '/assets/img/map/pin-blue',
          img_red = '/assets/img/map/pin-red',
          img_top = '/assets/img/map/marker-red';

    articles.forEach(article => {
      marker = {
        lon: parseFloat(article.pos.coordinates[0]),
        lat: parseFloat(article.pos.coordinates[1]),
        label: '',
        icon: article.isTopAttraction ? img_top : (article.hasArticle ? img_red : img_blue),
        url: article.hasArticle ? '/' + this.city.alias.nl + '/attracties/' + article.alias : '',
        isOpen: false,
        infoImg: this.imgHost + '/img/' + this.city.alias.en + '/' + article.thumb + '.jpg',
        infoTxt: article.title,
        address: this.itemService.getAddress(article.address)
      };
      this.markers.push(marker);
    });
    this.markersDone = true;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
