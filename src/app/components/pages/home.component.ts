import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
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
  coverSuffix = '';
  coverImage = '';

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

  onResize(event) {
    this.setCoverSuffix(event.target.innerWidth);
    this.setCoverImage();
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
        this.setCoverSuffix(window.innerWidth);
        this.coverImage = data.img;
        this.cover = {
          img: '',
          title: data.item.name + ', ' + data.city.name,
          url: data.item.alias ? data.city.alias + '/attracties/' + data.item.alias : ''
        };
        this.setCoverImage();
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

  setCoverSuffix(screenWidth: number) {
    let suffix = ''; // max width (x858)
    /* 480, 768, 992, 1200 */
    if (screenWidth < 1200) {
      suffix = 'x658';
    }
    if (screenWidth < 992) {
      suffix = 'x720';
    }

    if (screenWidth < 1) {
      suffix = '';
    }
    if (!this.cover) {
    }
    this.coverSuffix = suffix;
  }

  setCoverImage() {
    if (this.cover) {
      this.cover.img = this.globalService.imageHost + '/img/zzhome/covers_3/covers3_' + this.coverImage + this.coverSuffix + '.jpg';
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
