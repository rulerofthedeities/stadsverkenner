import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {Article} from '../../models/item.model';
import {PictureModalComponent} from '../modals/picture-modal.component';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';

@Component({
  template: `
  <div class="ads">
    ADS
  </div>
  <section>
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
      const alt = $event.target.alt;
      const imgId = $event.target.dataset.lnk;
      if (imgId) {
        modal.title = alt;
        modal.imgUrl = this.globalService.imageHost + '/img/' + this.path + '/' + imgId + 's.jpg';
        modal.showModal = true;
      }
      let hrefId = $event.target.dataset.href;
      if (hrefId) {
        if (hrefId.substring(0, 3) === '../') {
          // outside current city -> skip attracties dir
          hrefId = '../' + hrefId;
        }
        if (hrefId.substring(0, 4) === 'http') {
          // external url
          // window.location.href = hrefId;
          window.open(hrefId, '_blank');
        } else {
          this.router.navigate(['../../' + hrefId], { relativeTo: this.route });
        }
      }
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
