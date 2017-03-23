import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city.model';

@Component({
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {
  cities: City[];

  constructor(
    private citiesService: CityService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.citiesService.getCities().subscribe(
      cities => this.cities = cities,
      error => this.errorService.handleError(error)
    );
  }
}
