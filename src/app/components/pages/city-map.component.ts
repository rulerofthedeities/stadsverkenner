import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ItemService} from '../../services/item.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city.model';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <div class="map" *ngIf="articles">
    <sebm-google-map 
    [longitude]="city.pos[0]"
    [latitude]="city.pos[1]"
    [zoom]="zoom">

    </sebm-google-map>
  </div>

  <pre>{{city|json}}</pre>
  <pre>{{articles|json}}</pre>
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
export class CityMapComponent implements OnInit, OnDestroy {
  componentActive = true;
  articles: Object;
  city: City;
  zoom = 13;
  imgHost: string;

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
        this.zoom = parseInt(this.city.zoom, 10);
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
      articles => this.articles = articles,
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
