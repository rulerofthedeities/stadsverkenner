import {Component, OnInit, OnDestroy} from '@angular/core';
import {Error} from '../../models/error.model';
import {ErrorService} from '../../services/error.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'km-error-msg',
  template: `
    <div *ngIf="showError" class="text-danger">
      <h4>{{errorData?.title}}</h4>
      <p>Error message: {{errorData?.message}}</p>
    </div>`
})

export class ErrorMessageComponent implements OnInit, OnDestroy {
  componentActive = true;
  errorData: Error;
  showError = false;

  constructor (
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.errorService.errorOccurred
    .takeWhile(() => this.componentActive)
    .subscribe(
      errorData => {
        this.errorData = errorData;
        this.showError = true;
      }
    );
  }

  onClose() {
    this.showError = false;
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
