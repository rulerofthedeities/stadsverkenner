import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CityService} from '../../services/city.service';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {City, Slide} from '../../models/city.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: './city-intro.component.html',
  styles: [`
    :host /deep/ .carousel {
      max-width: 547px;
    }
    :host /deep/ .carousel-caption {
      right: 0;
      left: 0;
      font-size: 18px;
      background-color: #222;
      opacity:0.7;
      padding: 6px 0 0;
      bottom: 0;
    }
    :host /deep/ .carousel-caption p {
      margin: 0 0 30px;
      cursor: pointer;
    }
    :host /deep/ .carousel-indicators {
      bottom: 0;
    }
  `]
})
export class CityIntroComponent implements OnInit, OnDestroy {
  componentActive = true;
  city: City;
  slides: Slide[];
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
    this.fetchCitySlides(cityAlias);
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

  fetchCitySlides(cityAlias: string) {
    this.cityService
    .getCitySlides(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.slides = data;
      },
      error => this.errorService.handleError(error)
    );
  }

  fetchImageHost() {
    this.imgHost = this.globalService.imageHost;
  }

  onClick($event: any) {
    if ($event.target) {
      const hrefId = $event.target.dataset.href;
      if (hrefId) {
        console.log('linking to', hrefId, this.route);
        this.router.navigate([hrefId], { relativeTo: this.route });
      }
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
