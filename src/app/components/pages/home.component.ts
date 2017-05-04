import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CityService} from '../../services/city.service';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {HeaderService} from '../../services/header.service';

interface Popular {
  alias: string;
  name: string;
  city?: string;
  total: number;
}

@Component({
  template: `
    <km-main-menu></km-main-menu>
      <div class="slide">
        SLIDE
      </div>
      <div class="popular">
        <div class="cities">
          <div class="header">
            Populairste steden
          </div>
          <ul class="list-unstyled box">
            <li *ngFor="let city of popularCities; let i=index">
              {{i+1}}. <a routerLink="{{city.alias}}">{{city.name}}</a>
            </li>
          </ul>
        </div>
        <div class="articles">
          <div class="header">
            Populairste artikels
          </div>
          <ul class="list-unstyled box">
            <li *ngFor="let item of popularArticles; let i=index">
              {{i+1}}. <a routerLink="{{item.city + '/attracties/' + item.alias}}">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
  `,
  styles: [`
    .slide {
      float: left;
    }
    .popular {
      width: 300px;
      float: right;
    }
    .header {
      background-color: #b9e58b;
      border: 1px solid #538f18;
      border-bottom: 0;
      color: #333;
      font-weight: bold;
      padding: 2px;
      text-align: center;
    }
    .box{
      padding: 12px 8px;
      border: 1px solid #538f18;
    }
  `]
})

export class HomeComponent implements OnInit, OnDestroy {
  componentActive = true;
  popularCities: Popular[];
  popularArticles: Popular[];

  constructor(
    private itemService: ItemService,
    private cityService: CityService,
    private errorService: ErrorService,
    private globalService: GlobalService,
    private headerService: HeaderService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.globalService.title);
    this.headerService.setTitle(this.globalService.title);
    this.fetchData();
  }

  fetchData() {
    this.fetchMostPopularCities();
    this.fetchMostPopularArticles();
  }

  fetchMostPopularCities() {
    this.cityService
    .getCityTraffic()
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => this.popularCities = data,
      error => this.errorService.handleError(error)
    );
  }

  fetchMostPopularArticles() {
    this.itemService
    .getArticleTraffic()
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => this.popularArticles = data,
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
