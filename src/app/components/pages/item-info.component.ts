import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {Article} from '../../models/article.model';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  template: `item info
  <section *ngIf="dataLoaded">
    <div [innerHTML]="article.content | sanitizeHtml" class="content"></div>
  </section>`
})
export class ItemInfoComponent implements OnInit, OnDestroy {
  private componentActive = true;
  private cityAlias: string;
  dataLoaded = false;
  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        console.log('params', params);
        if (params['item']) {
          this.getRouterData(params['item']);
        }
      }
    );
  }

  getRouterData(itemAlias: string) {
    // Get city alias from router
    this.router.events
    .takeWhile(() => this.componentActive && !this.dataLoaded)
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      this.route.root.children.forEach(route => {
        if (route.outlet === 'primary') {
          this.cityAlias = route.snapshot.url[0].path;
          this.getArticleData(this.cityAlias, itemAlias);
        }
      });
    });
  }

  getArticleData(cityAlias, itemAlias) {
    this.itemService
    .getArticleInfo(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      article => {
        this.article = article;
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
