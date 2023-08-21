
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-clienttable',
  templateUrl: './clienttable.component.html',
  styleUrls: ['./clienttable.component.css'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1, height: '*' })),
      state('hidden', style({ opacity: 0, height: '0' })),
      transition('visible <=> hidden', animate('500ms ease-in-out')),
    ]),
  ],
})
export class ClienttableComponent {
  client: string = '';
  tableNumber: string = '';
  menuVisible: boolean = false;
  orderStarted: boolean = false;
  selectedMenuType: string = '';
  selectedProducts: any[] = [];
  order: any = { client: '', tableNumber: '', products: [] };
  constructor(private http: HttpClient, private orderService: OrderService) { }

  private isFormValid(): boolean {
    return this.client.trim() !== '' && this.tableNumber.trim() !== '';
  }

  startOrder() {
     if (!this.isFormValid()) {
      console.log('Order failed');
      return;
    }
/*
    const orderData = {
      client: this.client,
      tableNumber: this.tableNumber,
      products: this.selectedProducts.map(item => ({
        qty: item.qty,
        product: item.product.id,
      })),
    };

    this.orderService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Order created successfully:', response);
        this.orderStarted = true;
        this.menuVisible = true;
      },
      
      (error) => {
        console.error('Failed to create order:', error);
      }
    ); */
  
    this.order.client = this.client;
    this.order.tableNumber = this.tableNumber;
  
    this.orderStarted = true;
    this.menuVisible = true;
  }

  onMenuSelected(selectedType: string) {
    this.selectedMenuType = selectedType;
    this.menuVisible = true;
    this.orderStarted = true;
  }
  onMenuProductSelected(product: any) {
    this.addProductToOrder(product);
  }
  addProductToOrder(product: any) {
    const existingProduct = this.selectedProducts.find(item => item.product.id === product.id);
    
    if (existingProduct) {
      existingProduct.qty++;
    } else {
      this.selectedProducts.push({ product, qty: 1 });
    }
  
    this.order.products = this.selectedProducts.map(item => ({
      qty: item.qty,
      product: item.product,
    }));
  
    // Atualize o order.client e order.tableNumber aqui
    this.order.client = this.client;
    this.order.tableNumber = this.tableNumber;
  
    // Chame a função setOrderInfo do OrderService
    this.orderService.setOrderInfo(this.client, this.tableNumber,  this.selectedProducts);
  }
  
}
