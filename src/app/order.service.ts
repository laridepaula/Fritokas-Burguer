import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OrderInfo {
  client: string;
  tableNumber: string;
  products: any[];
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}
  private orderInfo: OrderInfo = { client: '', tableNumber: '', products: [] };
  
  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(this.baseUrl, orderData, { headers });
    }
    console.log(token)
    return new Observable<any>();
  }

  updateOrder(orderId: number, updatedOrderData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const url = `${this.baseUrl}/${orderId}`;
      return this.http.put<any>(url, updatedOrderData, { headers });
    }
    return new Observable<any>();
  }

  setOrderInfo(client: string, tableNumber: string,  products: any[]) {
    this.orderInfo.client = client;
    this.orderInfo.tableNumber = tableNumber;
    this.orderInfo.products = products;
  }

  getOrderInfo() {
    return this.orderInfo;
  }
}
