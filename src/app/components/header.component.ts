import {Component, OnInit} from '@angular/core';
import {HeaderService} from '../services/header.service';

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
  title = 'Stadsverkenner';

  constructor(
    public headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.newTitle.subscribe(
      title => {
        this.title = title;
      }
    );
  }
}
