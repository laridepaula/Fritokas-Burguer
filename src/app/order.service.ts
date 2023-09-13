import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }
  selectedProducts: any[] = [];
  private clientName: string = '';
  private tableNumber: string = '';
  orderData: any = { client: '', table: '', products: [], orderTime: '' };

  addProduct(product: any) {
    const existingProduct = this.selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.count++;
    } else {
      this.selectedProducts.push({ ...product, count: 1 });
    }
  }

  removeProduct(product: any) {
    const existingProduct = this.selectedProducts.find(p => p.id === product.id);
    if (existingProduct && existingProduct.count > 0) {
      existingProduct.count--;
      if (existingProduct.count === 0) {
        this.selectedProducts = this.selectedProducts.filter(p => p.id !== product.id);
      }
    }
  }
  setClientTable(clientName: string, tableNumber: string) {
    this.clientName = clientName;
    this.tableNumber = tableNumber;
  }

  getClientTable() {
    return { clientName: this.clientName, tableNumber: this.tableNumber };
  }

  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userId = '4';
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      orderData.userId = userId;
      return this.http.post<any>(this.baseUrl, orderData, { headers });
    }
    console.log(token)
    return new Observable<any>();
  }
}
