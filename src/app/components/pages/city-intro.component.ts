import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CityService} from '../../services/city.service';
import {ItemService} from '../../services/item.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {City, Slide} from '../../models/city.model';
import {Article} from '../../models/item.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: './city-intro.component.html',
  styleUrls: ['city-intro.component.css']
})
export class CityIntroComponent implements OnInit, OnDestroy {
  componentActive = true;
  city: City;
  slides: Slide[];
  imgHost: string;
  articles: Article[];

  constructor(
    private cityService: CityService,
    private itemService: ItemService,
    private globalService: GlobalService,
    private errorService: ErrorService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cityAlias = this.router.url.slice(1);
    this.fetchImageHost();
    this.fetchCityData(cityAlias);
    this.fetchCitySlides(cityAlias);
    this.fetchArticleData(cityAlias);
  }

  fetchCityData(cityAlias: string) {
    this.cityService
    .getCityData(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.city = data;
        this.titleService.setTitle(data['name']['nl']);
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchCitySlides(cityAlias: string) {
    this.cityService
    .getCitySlides(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.slides = data;
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchArticleData(cityAlias: string) {
    this.itemService
    .getArticles(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => this.articles = data.slice(0, 11),
      error => this.errorService.handleError(error)
    );
  }

  fetchImageHost() {
    this.imgHost = this.globalService.imageHost;
  }

  onClick($event: any) {
    if ($event.target) {
      const hrefId = $event.target.dataset.href;
      if (hrefId) {
        console.log('linking to', hrefId, this.route);
        this.router.navigate([hrefId], { relativeTo: this.route });
      }
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
