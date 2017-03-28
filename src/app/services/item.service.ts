import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemService {

  constructor(
    private http: Http
  ) {}

  getArticles(cityAlias: string) {
    return this.http
    .get('/api/articles/' + cityAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticleHead(cityAlias: string, itemAlias: string) {
    return this.http
    .get('/api/article/head/' + cityAlias + '/' + itemAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticleInfo(cityAlias: string, itemAlias: string) {
    return this.http
    .get('/api/article/info/' + cityAlias + '/' + itemAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticleLocation(cityAlias: string, itemAlias: string) {
    return this.http
    .get('/api/article/location/' + cityAlias + '/' + itemAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticlePhotos(cityAlias: string, itemAlias: string) {
    return this.http
    .get('/api/article/photos/' + cityAlias + '/' + itemAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

}
