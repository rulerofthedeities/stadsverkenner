import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CityService} from '../../services/city.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {City} from '../../models/city.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: './city-intro.component.html'
})
export class CityIntroComponent implements OnInit, OnDestroy {
  componentActive = true;
  city: City;
  imgHost: string;

  constructor(
    private cityService: CityService,
    private globalService: GlobalService,
    private errorService: ErrorService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cityAlias = this.router.url.slice(1);
    this.fetchImageHost();
    this.fetchCityData(cityAlias);
  }

  fetchCityData(cityAlias: string) {
    this.cityService
    .getCityData(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.city = data;
        this.titleService.setTitle(data['name']['nl']);
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchImageHost() {
    this.imgHost = this.globalService.imageHost;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
