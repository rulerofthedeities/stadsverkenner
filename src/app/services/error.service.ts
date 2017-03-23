import {EventEmitter} from '@angular/core';
import {Error} from '../models/error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(error: any) {
    const errorObj = error.json();
    console.log('Error:', errorObj);
    let msg = 'Ongekende fout',
        title = 'error';
    if (errorObj && errorObj.error) {
      msg = errorObj.error.error || msg;
      title = errorObj.title || title;
    }
    this.errorOccurred.emit(new Error(title, msg));
  }
}
