import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ItemService {

  constructor(
    private http: Http
  ) {}

  getArticle(cityAlias: string, itemAlias: string) {
    return this.http
    .get('/api/article/' + cityAlias + '/' + itemAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticles(cityAlias: string) {
    return this.http
    .get('/api/articles/' + cityAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }
}
