import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ErrorService} from '../../services/error.service';
import {GlobalService} from '../../services/global.service';
import {HeaderService} from '../../services/header.service';

@Component({
  template: `
    <km-main-menu></km-main-menu>
    <h1>Home</h1>
  `
})

export class HomeComponent implements OnInit {

  constructor(
    private errorService: ErrorService,
    private globalService: GlobalService,
    private headerService: HeaderService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.globalService.title);
    this.headerService.setTitle(this.globalService.title);
    this.fetchData();
  }

  fetchData() {
    return;
  }
}
