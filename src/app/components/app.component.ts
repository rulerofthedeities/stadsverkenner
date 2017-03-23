import {Component} from '@angular/core';

@Component({
  selector: 'km-stadsverkenner',
  template: `
  <div class="container">
    <km-header></km-header>
    <router-outlet></router-outlet>
    <km-footer></km-footer>
  </div>
  `
})

export class AppComponent {
}
