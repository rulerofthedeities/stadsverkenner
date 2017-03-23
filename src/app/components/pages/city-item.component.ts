import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `item page`
})

export class CityItemComponent implements OnInit, OnDestroy {
  componentActive = true;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        if (params['item']) {
          console.log('item:', params['item']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
