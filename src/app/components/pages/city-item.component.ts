import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {Title} from '@angular/platform-browser';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `item page

  <pre>{{item|json}}</pre>
  `
})

export class CityItemComponent implements OnInit, OnDestroy {
  componentActive = true;
  item: any;

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
        if (params['item']) {
          console.log('item:', params['item']);
          this.getCityAlias(params['item']);
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
          const cityAlias = route.snapshot.url[0].path;
          this.getItem(cityAlias, itemAlias);
        }
      });
    });
  }

  getItem(cityAlias: string, itemAlias: string) {
    this.itemService
    .getArticle(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      item => {
        this.item = item;
        const newTitle = item.title + ', ' + item.cityName;
        this.titleService.setTitle(newTitle);
      },
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
