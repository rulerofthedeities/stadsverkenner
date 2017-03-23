import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  template: `City Map`
})
export class CityMapComponent {

  constructor(
    private titleService: Title
  ) {}
}
