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
  `,
  styleUrls: ['item-info.component.css']
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
    // Check for route changes in case link in article is clicked
    this.route.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      () => {
        const paths = this.router.url.split('/');
        this.getArticleData(paths[1], paths[3]);
      }
    );
  }

  getArticleData(cityAlias, itemAlias) {
    this.itemService
    .getArticleInfo(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      article => {
        this.article = this.itemService.processData(article.content);
        this.path = article.path;
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  onClick($event: any, modal: PictureModalComponent) {
    if ($event.target) {
      console.log($event.target);
      const alt = $event.target.alt;
      const imgId = $event.target.dataset.lnk;
      if (imgId) {
        modal.title = alt;
        modal.imgUrl = this.globalService.imageHost + '/img/' + this.path + '/' + imgId + 's.jpg';
        modal.showModal = true;
      }
      const hrefId = $event.target.dataset.href;
      if (hrefId) {
        console.log('linking to', hrefId, this.route);
        this.router.navigate(['../../' + hrefId], { relativeTo: this.route });
      }
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
