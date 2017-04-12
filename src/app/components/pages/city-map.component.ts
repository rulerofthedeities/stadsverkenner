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
  template: `City Map
  <pre>{{city|json}}</pre>
  <pre>{{articles|json}}</pre>
  `
})
export class CityMapComponent implements OnInit, OnDestroy {
  componentActive = true;
  articles: Object;
  city: City;
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
