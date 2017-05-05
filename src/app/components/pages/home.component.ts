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

interface Cover {
  img: string;
  title: string;
  url: string;
}

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  componentActive = true;
  popularCities: Popular[];
  popularArticles: Popular[];
  cover: Cover;

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
    this.fetchCover();
    this.fetchMostPopularCities();
    this.fetchMostPopularArticles();
  }

  fetchCover() {
    this.cityService
    .getCover()
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.cover = {
          img: this.globalService.imageHost + '/img/zzhome/covers3_' + data.img + '.jpg',
          title: data.item.name + ', ' + data.city.name,
          url: data.item.alias ? data.city.alias + '/attracties/' + data.item.alias : ''
        };
      },
      error => this.errorService.handleError(error)
    );
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
