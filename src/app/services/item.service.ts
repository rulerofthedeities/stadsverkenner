import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GlobalService} from './global.service';
import {Address} from '../models/map.model';
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
    let processedContent = '';
    // Replace hrefs with data tags
    if (content) {
      const imgPath = this.globalService.imageHost + '/img/';
      processedContent = content.replace(/\.\.\/img\//ig, imgPath); // relative path
      processedContent = processedContent.replace(/\"\/img\//ig, '"' + imgPath); // fixed path
      processedContent = processedContent.replace(/href=\"/ig, 'data-href="');
    }
    return processedContent;
  }

  getAddress(address: Address): string[] {
    let newAddress = [];
    if (address) {
      const addressTxt = address.nl ? address.nl : address.en;
      newAddress = addressTxt.split(';');
    }
    return newAddress;
  }
}
