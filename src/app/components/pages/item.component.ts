import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {Title} from '@angular/platform-browser';
import {Article} from '../../models/item.model';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  private componentActive = true;
  article: Article;
  itemAlias: string;
  dataLoaded = false;
  tabs: Object = {};
  cityAlias: string;
  preview: string;
  articles: [Article];
  next: string;
  previous: string;
  pageExists = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private itemService: ItemService,
    private titleService: Title,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.route.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        if (params['item'] && this.itemAlias !== params['item']) {
          this.itemAlias = params['item'];
          this.cityAlias = this.router.url.split('/')[1];
          this.getArticleData(this.cityAlias, this.itemAlias);
          this.fetchArticles(this.cityAlias);
        }
      }
    );
  }

  getArticleData(cityAlias: string, itemAlias: string) {
    this.itemService
    .getArticleHead(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      article => {
        if (article) {
          this.article = article;
          this.preview = this.itemService.processData(article.preview);
          this.dataLoaded = true;
          const newTitle = article.title + ', ' + article.cityName;
          this.titleService.setTitle(newTitle);
          this.setTabs();
        } else {
          this.pageExists = false;
        }
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchArticles(cityAlias: string) {
    this.itemService
    .getArticles(cityAlias)
    .takeWhile(() => this.componentActive && this.pageExists)
    .subscribe(
      articles => {
        this.articles = articles;
        this.setNextAndPrevious();
      },
      error => this.errorService.handleError(error)
    );
  }

  setTabs() {
    this.tabs = {
      'info' : true,
      'location' : this.article.hasPos,
      'photos' : (this.article.photoCount + this.article.photoCountRelated) > 0
    };
  }

  setNextAndPrevious() {
    let current;
    // find current
    this.articles.forEach((article, i) => {
      if (article.alias === this.itemAlias) {
        current = i;
      }
    });
    if (current !== null) {
      this.previous = current > 0 ? '../' + this.articles[current - 1].alias : null;
      this.next = '../' + this.articles[(current + 1) % this.articles.length ].alias;
    }
  }

  onClick($event: any) {
    if ($event.target) {
      const hrefId = $event.target.dataset.href;
      if (hrefId) {
        console.log('linking to', hrefId, this.route);
        this.router.navigate(['../' + hrefId], { relativeTo: this.route });
      }
    }
  }

  onSelectItem(itemAlias: string) {
    this.router.navigate([this.cityAlias + '/attracties/' + itemAlias]);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
