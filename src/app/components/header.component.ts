import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'km-header',
  template: `
    <div>
      <img src="/assets/img/layout/logo.png" alt="Stadsverkenner" class="logo pull-left">
      <div class="banner">
        {{title}}
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  componentActive = true;
  title = 'Stadsverkenner';

  constructor(
    public headerService: HeaderService
  ) {}

  ngOnInit() {
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
