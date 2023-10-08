import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  getAllOrders(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any[]>(this.baseUrl, { headers });
    }
    return new Observable<any[]>();
  }

  private orderStatus: { [orderId: number]: { status: string, dateDoing: string, dateDone: string } } = {};

  setInitialStatus(orderId: number) {
    this.orderStatus[orderId] = { status: 'pendente', dateDoing: '', dateDone: '' };
  }

  getStatus(orderId: number): string {
    const order = this.orderStatus[orderId];
    return order ? order.status : 'pendente';
  }
  

  setStatus(orderId: number, newStatus: string) {
    if (['pendente', 'fazendo', 'feito'].includes(newStatus)) {
      this.orderStatus[orderId].status = newStatus;
    }
  }

  updateOrderStatus(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const currentStatus = this.getStatus(orderId);
      let newStatus: string;

      if (currentStatus === 'pendente') {
        newStatus = 'fazendo';
      } else if (currentStatus === 'fazendo') {
        newStatus = 'feito';
      } else {
        // Não permitir transições quando o status for "feito"
        return new Observable<any>();
      }

      const updateData = { status: newStatus };

      return this.http.patch<any>(`${this.baseUrl}/${orderId}`, updateData, { headers }).pipe(
        tap(() => {
          this.updateStatus(orderId, newStatus);
        })
      );
    }
    return new Observable<any>();
  }

  updateStatus(orderId: number, newStatus: string) {
    if (this.orderStatus[orderId]) {
      this.orderStatus[orderId].status = newStatus;
      if (newStatus === 'fazendo') {
        this.orderStatus[orderId].dateDoing = new Date().toISOString();
      } else if (newStatus === 'feito') {
        this.orderStatus[orderId].dateDone = new Date().toISOString();
      }
    }
  }

  calculateProcessingTime(orderId: number): string {
    const currentStatus = this.orderStatus[orderId];
    if (currentStatus && currentStatus.dateDoing && currentStatus.dateDone) {
      const startTime = new Date(currentStatus.dateDoing).getTime();
      const endTime = new Date(currentStatus.dateDone).getTime();
      const timeDiff = endTime - startTime;
      const minutes = Math.floor(timeDiff / 1000 / 60);
      return `${minutes} minutos`;
    }
    return '';
  }

  // Adicione este método para obter o texto do botão com base no status atual do pedido
  getOrderButtonText(orderId: number): string {
    const currentStatus = this.getStatus(orderId);
    if (currentStatus === 'pendente') {
      return 'Iniciar Preparação';
    } else if (currentStatus === 'fazendo') {
      return 'Concluir';
    } else {
      return 'Feito';
    }
  }
}
