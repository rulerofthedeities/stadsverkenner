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
  article: Article;
  itemAlias: string;
  componentActive = true;
  dataLoaded = false;
  tabs: Object = {};
  cityAlias: string;
  preview: string;
  articles: [Article];

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
        this.article = article;
        this.preview = this.itemService.processData(article.preview);
        this.dataLoaded = true;
        const newTitle = article.title + ', ' + article.cityName;
        this.titleService.setTitle(newTitle);
        this.setTabs();
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

  setTabs() {
    this.tabs = {
      'info' : true,
      'location' : this.article.hasPos,
      'photos' : this.article.photoCount > 0
    };
  }

  onClick($event: any) {
    if ($event.target) {
      const hrefId = $event.target.dataset.href;
      if (hrefId) {
        console.log('linking to', hrefId, this.route);
        this.router.navigate(['../' + hrefId], { relativeTo: this.route });
        // this.router.navigate(['/' + this.cityAlias + '/attracties/' + hrefId]);
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
