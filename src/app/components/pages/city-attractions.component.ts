import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
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
    public itemService: ItemService,
    public cityService: CityService,
    public globalService: GlobalService,
    public errorService: ErrorService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.fetchImageHost();

    // Get city alias from router
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
    this.cityService.getCity(cityAlias).subscribe(
      data => {this.city = data; console.log('city', data); },
      error => this.errorService.handleError(error)
    );
  }

  fetchArticles(cityAlias: string) {
    this.itemService.getArticles(cityAlias).subscribe(
      articles => {this.articles = articles; console.log('articles', articles); },
      error => this.errorService.handleError(error)
    );
  }

  fetchImageHost() {
    this.imgHost = this.globalService.imageHost;
  }

  processHtml(html: string) {
    return html.replace('href', 'routerlink');
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
