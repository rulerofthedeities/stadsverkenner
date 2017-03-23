import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CityService} from '../../services/city.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {City} from '../../models/city.model';

@Component({
  templateUrl: './city-intro.component.html'
})
export class CityIntroComponent implements OnInit {
  city: City;
  imgHost: string;

  constructor(
    public cityService: CityService,
    public globalService: GlobalService,
    public errorService: ErrorService,
    public router: Router
  ) {}

  ngOnInit() {
    const cityAlias = this.router.url.slice(1);
    this.fetchImageHost();
    this.fetchCityData(cityAlias);
  }

  fetchCityData(cityAlias: string) {
    this.cityService.getCityData(cityAlias).subscribe(
      data => {this.city = data; },
      error => this.errorService.handleError(error)
    );
  }

  fetchImageHost() {
    this.imgHost = this.globalService.imageHost;
  }
}
