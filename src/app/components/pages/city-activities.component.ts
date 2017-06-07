import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GlobalService} from '../../services/global.service';
import {ErrorService} from '../../services/error.service';
import {CityService} from '../../services/city.service';
import {ActivityService} from '../../services/activity.service';
import {City} from '../../models/city.model';
import {Activity} from '../../models/activity.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: 'city-activities.component.html',
  styles: [`
    .totals{
      color: #666;
      font-size: 13px;
      margin-top: 3px;
      font-style: italic;
    }
  `]
})

export class CityActivitiesComponent implements OnInit, OnDestroy {
  private componentActive = true;
  private allActivities: Activity[];
  private filteredActivities: Activity[];
  imgHost: string;
  city: City;
  total: {total: number, filtered: number};
  batch = 10; // #of activities shown per scroll
  activities: Activity[];
  search: string;

  constructor(
    private cityService: CityService,
    private activityService: ActivityService,
    private errorService: ErrorService,
    private globalService: GlobalService,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.imgHost = this.globalService.imageHost;
    this.getCityAlias();
  }

  onSearchChanged() {
    const regex = new RegExp(this.search, 'gi');
    this.filteredActivities = this.allActivities.filter(activity => activity.name.match(regex));
    this.total.filtered = this.filteredActivities.length;
    this.setActivityBatch(null);
  }

  onScrollDown() {
    const len = this.activities.length;
    if (len < this.total.filtered) {
      this.setActivityBatch(len + this.batch);
    }
  }

  private getCityAlias() {
    this.router.events
    .takeWhile(() => this.componentActive)
    .filter(event => event instanceof NavigationEnd)
    .subscribe(event => {
      this.route.root.children.forEach(route => {
        if (route.outlet === 'primary') {
          const cityAlias = route.snapshot.url[0].path;
          this.fetchCity(cityAlias);
        }
      });
    });
  }

  private setActivityBatch(len: number) {
    this.activities = this.filteredActivities.slice(0, len || this.filteredActivities.length);
  }

  private fetchCity(cityAlias: string) {
    this.cityService
    .getCity(cityAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data => {
        this.city = data;
        this.fetchActivities();
        this.titleService.setTitle('Rondleidingen en activiteiten in ' + data['name']['nl']);
      },
      error => this.errorService.handleError(error)
    );
  }

  private fetchActivities() {
    this.activityService
    .getActivities(this.city.alias.en)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data  => this.setActivities(data),
      error => this.errorService.handleError(error)
    );
  }

  private setActivities(data: Activity[]) {
    if (data) {
      this.allActivities = data;
      this.filteredActivities = data;
      this.total = {total: data.length, filtered: data.length};
      this.activities = data.slice(0, this.batch);
    }
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
