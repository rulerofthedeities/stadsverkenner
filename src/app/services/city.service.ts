import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
    .get('/api/citydata/' + city)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }
}
