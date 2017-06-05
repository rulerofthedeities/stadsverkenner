import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {HeaderService} from '../../services/header.service';
import {Flags} from '../../models/city.model';
import {City} from '../../models/city.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <km-city-menu
    [tabs]="tabs"
    [cityAlias]="cityAlias">
  </km-city-menu>
  <router-outlet></router-outlet>
  `
})
export class CityComponent implements OnInit, OnDestroy {
  componentActive = true;
  tabs: Object = {};
  cityAlias: string;

  constructor(
    private errorService: ErrorService,
    private cityService: CityService,
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.activatedRoute.params
    .takeWhile(() => this.componentActive)
    .subscribe(
      params => {
        if (params['city']) {
          this.cityAlias = params['city'];
          this.fetchCityData(this.cityAlias);
        }
      }
    );
  }

  fetchCityData(cityAlias: string) {
    this.cityService
    .getCity(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      cityData => {
        this.titleService.setTitle(cityData['name']['nl']);
        this.setTabs(cityData.flags);
        this.setTitle(cityData.name.nl);
      },
      error => this.errorService.handleError(error)
    );
  }

  setTabs(flags: Flags) {
    this.tabs = {
      'intro' : true,
      'attractions' : flags.hasAttractionsListPage,
      'activities' : flags.hasToursPage,
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
