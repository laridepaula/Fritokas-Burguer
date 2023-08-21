import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {
  @Input() selectedType: string = ''; 
  @Output() productSelected = new EventEmitter<any>();
  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedType']) {
      this.loadProducts();
    }
  }
  loadProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const urlBackend = 'http://localhost:8080/products';
      this.http.get<any[]>(urlBackend, { headers }).subscribe((data) => {
        this.products = data.filter(product => product.type === this.selectedType);
      });
    }
  }

  productCounts: { [productId: string]: number } = {};

  increment(product: any) {
    if (!this.productCounts[product.id]) {
      this.productCounts[product.id] = 1;
    } else {
      this.productCounts[product.id]++;
    }
    console.log(product);
  }

  decrement(product: any) {
    if (this.productCounts[product.id] && this.productCounts[product.id] > 0) {
      this.productCounts[product.id]--;
    }
  }

  selectProduct(product: any) {
    console.log (this.productSelected)
    this.productSelected.emit(product.id);
  }
  
}