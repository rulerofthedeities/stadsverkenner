import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

export class ItemRedirectComponent implements OnInit{
  private componentActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRouterData();
  }

  getRouterData() {
    const url = this.router.url.split('/');
    if (url.length > 2) {
      this.router.navigate(['../attracties/' + url[2]], { relativeTo: this.route });
    }
  }
}
