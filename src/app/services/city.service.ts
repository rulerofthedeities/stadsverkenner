import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {City} from '../models/city.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CityService {

  constructor(
    private http: Http
  ) {}

  getCities() {
    return this.http
    .get('/api/cities')
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getCity(city: string) {
    return this.http
    .get('/api/city/' + city)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getCityData(city: string) {
    return this.http
    .get('/api/city/data/' + city)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getCitySlides(city: string) {
    return this.http
    .get('/api/city/slides/' + city)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getCityTraffic() {
    return this.http
    .get('/api/traffic/cities')
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getCover() {
    return this.http
    .get('/api/cover')
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }
}
