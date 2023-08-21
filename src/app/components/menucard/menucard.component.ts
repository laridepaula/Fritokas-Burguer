import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menucard',
  templateUrl: './menucard.component.html',
  styleUrls: ['./menucard.component.css']
})
export class MenucardComponent implements OnInit {
  isCafeSelected: boolean = false;
  isAlmocoSelected: boolean = false;
  @Output() menuSelected = new EventEmitter<string>();
  @Output() productSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  
  }

  selectCafe() {
    const selectedProduct = 
    this.isCafeSelected = true;
    this.isAlmocoSelected = false;
    this.menuSelected.emit('cafedamanha');
  }

  selectAlmoco() {
    const selectedProduct = 
    this.isCafeSelected = false;
    this.isAlmocoSelected = true;
    this.menuSelected.emit('almoco');
  }

  selectProduct(product: any) {
    this.productSelected.emit(product);
  }
}
