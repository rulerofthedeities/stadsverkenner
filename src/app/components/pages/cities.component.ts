import {Component, OnInit, OnDestroy} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {CityService} from '../../services/city.service';
import {HeaderService} from '../../services/header.service';
import {City} from '../../models/city.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit, OnDestroy {
  componentActive = true;
  cities: City[];

  constructor(
    private citiesService: CityService,
    private errorService: ErrorService,
    private globalService: GlobalService,
    private headerService: HeaderService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.globalService.title + ' - Overzicht Steden');
    this.headerService.setTitle(this.globalService.title);
    this.fetchData();
  }

  fetchData() {
    this.citiesService
    .getCities()
    .takeWhile(() => this.componentActive)
    .subscribe(
      cities => this.cities = cities,
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
