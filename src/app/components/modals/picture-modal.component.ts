import {Component} from '@angular/core';

@Component({
  selector: 'km-picture-modal',
  templateUrl: 'picture-modal.component.html',
  styleUrls: ['picture-modal.component.css']
})

export class PictureModalComponent {
  showModal = false;
  title: string;
  imgUrl: string;

  close() {
    this.showModal = false;
  }
}
