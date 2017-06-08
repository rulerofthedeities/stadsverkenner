import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Activity} from '../../models/activity.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'km-activities',
  templateUrl: 'activities.component.html',
  styleUrls: ['activities.component.css']
})

export class ActivitiesComponent {
  @Input() activities: Activity[];
  @Output() scrolledDown = new EventEmitter<boolean>();
  private loader = '';
  private loaderNr: number = null;

  onScrollDown() {
    console.log('scrolled down');
    this.scrolledDown.emit(true);
  }

  onBook(targetUrl: string, i: number) {
    this.setLoader(i);
    window.location.href = targetUrl;
  }

  getStars(rating: number): string[] {
    return Array(Math.trunc(rating)).fill(1);
  }

  hasHalfStar(rating: number) {
    return rating.toString().slice(-2) === '.5';
  }

  getLoader(i: number): string {
    let loader = '';
    if (this.loaderNr === i) {
      loader = this.loader;
    }
    return loader;
  }

  private setLoader(i) {
    const loading = '...',
          timer = Observable.timer(100, 500); // Start after .1 secs, then check every .5 sec
    let cnt = 0;
    this.loaderNr = i;
    timer.subscribe(
      t => {
        cnt = (cnt + 1) % 4;
        this.loader = loading.slice(0, cnt);
      }
    );
  }
}
