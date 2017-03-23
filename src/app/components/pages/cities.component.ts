import {Component, OnInit, OnDestroy} from '@angular/core';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
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
    private errorService: ErrorService
  ) {}

  ngOnInit() {
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
