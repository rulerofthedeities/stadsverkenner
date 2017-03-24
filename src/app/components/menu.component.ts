import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

abstract class Menu {
  mobileMenu = false;

  constructor (
    private router: Router,
    private route: ActivatedRoute
  ) {}

  toggleActive(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.mobileMenu = !this.mobileMenu;
  }

  isActive(path: string): boolean {
    if (this.mobileMenu || this.router.url === path) {
      return true;
    } else {
      return false;
    }
  }
}

@Component({
  selector: 'km-main-menu',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu.css']
})

export class MainMenuComponent extends Menu {

  constructor (
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
  }
}


@Component({
  selector: 'km-city-menu',
  templateUrl: 'menu-city.component.html',
  styleUrls: ['./menu.css']
})

export class CityMenuComponent extends Menu {
  @Input() tabs;
  @Input() cityAlias;

  constructor (
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
  }

}

@Component({
  selector: 'km-item-menu',
  templateUrl: 'menu-item.component.html',
  styleUrls: ['./menu.css']
})

export class ItemMenuComponent extends Menu {
  @Input() tabs;
  @Input() cityAlias;
  @Input() itemAlias;

  constructor (
    router: Router,
    route: ActivatedRoute
  ) {
    super(router, route);
  }

}
