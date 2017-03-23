import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {HeaderService} from '../../services/header.service';
import {Flags} from '../../models/city.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <km-sub-menu [tabs]="tabs" [cityAlias]="cityAlias"></km-sub-menu>
  <router-outlet></router-outlet>
  `
})
export class CityComponent implements OnInit, OnDestroy {
  componentActive = true;
  tabs: Object = {};
  cityData: Object = {};
  cityAlias: string;

  constructor(
    private errorService: ErrorService,
    private cityService: CityService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        if (params['city']) {
          this.getCity(params['city']);
        }
      }
    );
  }

  getCity(cityAlias: string) {
    this.cityService
    .getCity(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.cityData = data;
        this.cityAlias = data.alias.en;
        this.setTabs(data.flags);
        this.setTitle(data.name.en);
      },
      error => this.errorService.handleError(error)
    );
  }

  setTabs(flags: Flags) {
    this.tabs = {
      'intro' : true,
      'attractions' : flags.hasAttractionsListPage,
      'map' : flags.hasMapPage
    };
  }

  setTitle(name: string) {
    this.headerService.setTitle(name);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
