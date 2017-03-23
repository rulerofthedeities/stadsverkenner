import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `item page`
})

export class CityItemComponent implements OnInit, OnDestroy {
  componentActive = true;
  item: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        if (params['item']) {
          console.log('item:', params['item']);
          this.getItem(params['item']);
        }
      }
    );
  }

  getItem(itemAlias: string) {
    this.itemService
    .getArticle('chicago', itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      item => this.item = item,
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
