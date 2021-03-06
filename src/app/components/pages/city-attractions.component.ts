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
  templateUrl: './city-attractions.component.html',
  styleUrls: ['./city-attractions.component.css']
})
export class CityAttractionsComponent implements OnInit, OnDestroy {
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
        this.titleService.setTitle('Bezienswaardigheden in ' + data['name']['nl']);
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchArticles(cityAlias: string) {
    this.itemService
    .getArticles(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      articles => this.articles = articles,
      error => this.errorService.handleError(error)
    );
  }

  processHtml(html: string) {
    return html.replace('href', 'routerlink');
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
