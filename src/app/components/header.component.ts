import {Component, OnInit, OnDestroy} from '@angular/core';
import {GlobalService} from '../services/global.service';
import {HeaderService} from '../services/header.service';

@Component({
  selector: 'km-header',
  template: `
    <div>
      <a routerLink="">
        <img src="/assets/img/layout/logo.png" alt="Stadsverkenner" class="logo pull-left">
      </a>
      <div class="banner">
        {{title}}
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentActive = true;
  title: string;

  constructor(
    private headerService: HeaderService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.title = this.globalService.title;
    this.headerService.newTitle
    .takeWhile(() => this.componentActive)
    .subscribe(
      title => {
        this.title = title;
      }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
