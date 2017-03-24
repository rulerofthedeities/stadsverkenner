import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {Title} from '@angular/platform-browser';
import {Article} from '../../models/article.model';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  template: `
  <section *ngIf="dataLoaded">
    <h1>{{article.title}}</h1>
    <div class="localname">{{article.subTitle}}</div>
    <div class="intro">
      {{article.preview}}
    </div>
  </section>
  
  <km-item-menu
    [tabs]="tabs"
    [itemAlias]="itemAlias"
    [cityAlias]="cityAlias">
  </km-item-menu>

  <pre>{{article|json}}</pre>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  componentActive = true;
  dataLoaded = false;
  tabs: Object = {};
  cityAlias: string;
  itemAlias: string;
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private itemService: ItemService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        console.log('params', params);
        if (params['item']) {
          this.itemAlias = params['item'];
          this.getCityAlias(this.itemAlias);
        }
      }
    );
  }

  getCityAlias(itemAlias: string) {
    // Get city alias from router
    this.router.events
    .takeWhile(() => this.componentActive)
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      this.route.root.children.forEach(route => {
        if (route.outlet === 'primary') {
          this.cityAlias = route.snapshot.url[0].path;
          console.log('getting article');
          this.getArticle(this.cityAlias, itemAlias);
        }
      });
    });
  }

  getArticle(cityAlias: string, itemAlias: string) {
    this.itemService
    .getArticleHead(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      article => {
        console.log('article', article);
        this.article = article;
        this.dataLoaded = true;
        const newTitle = article.title + ', ' + article.cityName;
        this.titleService.setTitle(newTitle);
        this.setTabs();
      },
      error => this.errorService.handleError(error)
    );
  }

  setTabs() {
    this.tabs = {
      'info' : true,
      'location' : this.article.hasPos,
      'photos' : this.article.photoCount > 0
    };
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
