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
  photos: any;
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
        this.photos = photos.items;
        this.imgPath = this.globalService.imageHost + '/img/' + photos.path + '/';
        this.dataLoaded = true;
      },
      error => this.errorService.handleError(error)
    );
  }

  selectPhoto(nr: number) {
    this.current = nr;
  }

  nextPhoto(nr: number) {
    nr = ++nr % this.photos.length;
    this.current = nr
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
