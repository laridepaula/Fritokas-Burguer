import { Component } from '@angular/core';

@Component({
  selector: 'app-menucard',
  templateUrl: './menucard.component.html',
  styleUrls: ['./menucard.component.css']
})
export class MenucardComponent {
  isCafeSelected: boolean = false;
  isAlmocoSelected: boolean = false;

  selectCafe() {
    this.isCafeSelected = true;
    this.isAlmocoSelected = false;
  }

  selectAlmoco() {
    this.isCafeSelected = false;
    this.isAlmocoSelected = true;
  }
}
