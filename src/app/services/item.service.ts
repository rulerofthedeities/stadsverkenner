import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './global.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemService {

  constructor(
    private http: Http,
    private globalService: GlobalService
  ) {}

  getArticles(cityAlias: string) {
    return this.http
    .get('/api/articles/' + cityAlias)
    .map(response => response.json().obj)
    .catch(error => Observable.throw(error));
  }

  getArticlesMap(cityAlias: string) {
    return this.http
    .get('/api/articles/map/' + cityAlias)
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

  processData(content: string): string {
    // Replace hrefs with data tags
    const imgPath = this.globalService.imageHost + '/img/';
    let processedContent = content.replace(/\.\.\/img\//ig, imgPath); // relative path
    processedContent = processedContent.replace(/\"\/img\//ig, '"' + imgPath); // fixed path
    processedContent = processedContent.replace(/href=\"/ig, 'data-href="');
    return processedContent;
  }
}
