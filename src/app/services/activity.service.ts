import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {City} from '../models/city.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ActivityService {

  constructor(
    private http: Http
  ) {}

  getActivities(cityAlias: string, itemId: string) {
    console.log('itemId', itemId);
    return this.http
    .get('/api/activities/' + cityAlias + '/' + itemId)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getActivityTpes(cityAlias: string) {
    return this.http
    .get('/api/activities/tpes/' + cityAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }
}
