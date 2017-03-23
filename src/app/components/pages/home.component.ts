import {Component, OnInit} from '@angular/core';
import {ErrorService} from '../../services/error.service';

@Component({
  template: `
    <km-main-menu></km-main-menu>
    <h1>Home</h1>
  `
})

export class HomeComponent implements OnInit {

  constructor(
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    return;
  }
}
