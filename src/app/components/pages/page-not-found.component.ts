import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'km-page-not-found',
  template: `
    <section>
      <div>Error: De Pagina \`{{this.url}}´ bestaat niet.</div>
      <div>
        <a routerLink="/">
          <span class="fa fa-home"></span> Naar de homepagina.
        </a>
      </div>
    </section>
  `,
  styles: [`
    section {
      font-size: 32px;
      text-align: center
    }
    div {
      margin:30px auto;
    }
  `]
})

export class PageNotFoundComponent implements OnInit {
  url = '';

  constructor (
    private router: Router
  ) {}

  ngOnInit() {
    this.url = this.router.url;
  }
}
