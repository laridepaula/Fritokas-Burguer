import { Component, Input } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  @Input() selectedProducts: any[] = [];

  order: any = { client: '', tableNumber: '', products: [] };

  constructor(private orderService: OrderService) {} 

  confirmOrder() {
    this.order.client = this.orderService.getOrderInfo().client;
  this.order.tableNumber = this.orderService.getOrderInfo().tableNumber;
    const orderData = {
      client: this.order.client,
      tableNumber: this.order.tableNumber,
      products: this.selectedProducts.map(item => ({
        qty: item.qty,
        product: item.product.id,
      })),
    };

    this.orderService.createOrder(orderData).subscribe(
      (response: any) => { 
        console.log('Order created successfully:', response);
        this.updateOrderOnServer(response.id);
      },
      (error: any) => {
        console.error('Failed to create order:', error);
      }
    );
  }

  updateOrderOnServer(orderId: number) {
    const updatedOrderData = {
      products: this.selectedProducts.map(item => ({
        qty: item.qty,
        product: item.product.id,
      })),
    };
    console.log(updatedOrderData)
    this.orderService.updateOrder(orderId, updatedOrderData).subscribe(
      (response: any) => { 
        console.log('Order updated successfully:', response);
      },
      (error: any) => { 
        console.error('Failed to update order:', error);
      }
    );
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.selectedProducts) {
      total += item.qty * item.product.price;
    }
    console.log(total)
    return total;
  }

  setOrderInfoFromService() {
    const orderInfo = this.orderService.getOrderInfo();
    this.order.client = orderInfo.client;
    this.order.tableNumber = orderInfo.tableNumber;
    this.order.products = orderInfo.products;
    console.log(orderInfo)
  }
  ngOnInit() {
    this.setOrderInfoFromService();
  }
  
  
}
