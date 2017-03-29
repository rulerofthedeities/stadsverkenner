import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {Article} from '../../models/article.model';
import {PictureModalComponent} from '../modals/picture-modal.component';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  template: `
  <section *ngIf="dataLoaded">
    <div [innerHTML]="article | sanitizeHtml" class="content" (click)="onClick($event, modal)"></div>
  </section>
  <km-picture-modal #modal></km-picture-modal>
  `
})
export class ItemInfoComponent implements OnInit, OnDestroy {
  private componentActive = true;
  private cityAlias: string;
  private path: string; // en city alias
  dataLoaded = false;
  article: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private errorService: ErrorService,
    private globalService: GlobalService
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
        this.article = this.processData(article.content);
        this.path = this.processData(article.path);
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  processData(content: string): string {
    const imgPath = this.globalService.imageHost + '/img/',
          processedContent = content.replace(/..\/img\//ig, imgPath);
    return processedContent;
  }

  onClick($event: any, modal: PictureModalComponent) {
    if ($event.target) {
      const alt = $event.target.alt;
      const imgId = $event.target.dataset.lnk;
      if (imgId) {
        modal.title = alt;
        modal.imgUrl = this.globalService.imageHost + '/img/' + this.path + '/' + imgId + 's.jpg';
        modal.showModal = true;
      }
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
