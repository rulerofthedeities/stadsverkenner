import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ActivityService} from '../../services/activity.service';
import {ErrorService} from '../../services/error.service';
import {Activity} from '../../models/activity.model';
import {Article} from '../../models/item.model';
import 'rxjs/add/operator/takeWhile';

@Component({
  template: `
  <km-activities
    [activities]="activities"
    >
  </km-activities>
  `
})

export class ItemActivitiesComponent implements OnInit, OnDestroy {
  private componentActive = true;
  private article: Article;
  activities: [Activity];

  constructor(
    private router: Router,
    private itemService: ItemService,
    private activityService: ActivityService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.getRouterData();
  }

  private getRouterData() {
    const paths = this.router.url.split('/');
    this.getArticleData(paths[1], paths[3]);
  }

  private getArticleData(cityAlias, itemAlias) {
    this.itemService
    .getArticleHead(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      article => {
        if (article) {
          this.article = article;
          console.log(article);
          this.fetchActivities();
        }
      },
      error => this.errorService.handleError(error)
    );
  }

  private fetchActivities() {
    this.activityService
    .getActivities(this.article.cityAlias, this.article.legacyId)
    .takeWhile(() => this.componentActive)
    .subscribe(
      data  => this.activities = data,
      error => this.errorService.handleError(error)
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
