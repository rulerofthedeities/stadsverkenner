import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'km-footer',
  template: `
    <div class="clearfix"></div>
    <div class="bar"></div>
    <address>&copy;{{year}} stadsverkenner.com</address>
    `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number;

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
