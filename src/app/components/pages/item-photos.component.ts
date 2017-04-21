import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  templateUrl: 'item-photos.component.html',
  styleUrls: ['item-photos.component.css']
})
export class ItemPhotosComponent implements OnInit, OnDestroy {
  private componentActive = true;
  private currentRoute: string;
  current = 0;
  dataLoaded = false;
  photos: string[];
  imgPath: string;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private errorService: ErrorService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.getRouterData();
  }

  getRouterData() {
    const paths = this.router.url.split('/');
    this.getPhotoData(paths[1], paths[3]);
  }

  getPhotoData(cityAlias, itemAlias) {
    this.itemService
    .getArticlePhotos(cityAlias, itemAlias)
    .takeWhile(() => this.componentActive)
    .subscribe(
      photos => {
        this.photos = this.buildPhotoList(photos);
        this.imgPath = this.globalService.imageHost + '/img/' + photos.path + '/';
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  buildPhotoList(photos: any): string[] {
    let photoList: string[] = [];
    if (photos.items) {
      photoList = photos.items;
      if (photos.related) {
        photoList = photoList.concat(photos.related);
      }
      // Put firstPhoto first in list
      const firstPhoto = photos.firstPhoto.slice(0, -1); // remove last character (s suffix)
      photoList.filter(photo => photo !== firstPhoto); // remove first photo from list
      photoList.unshift(firstPhoto); // add first photo to front of list
    }

    return photoList;
  }

  selectPhoto(nr: number) {
    this.current = nr;
  }

  nextPhoto(nr: number) {
    nr = ++nr % this.photos.length;
    this.current = nr;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
