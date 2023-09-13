import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() selectedProducts: any[] = [];
  clientName: string = '';
  tableNumber: string = '';
  showSummary: boolean = false;
  orderData: any = { client: '', table: '', products: [], orderTime: '' };


  constructor(private orderService: OrderService) {
    const clientTable = this.orderService.getClientTable();
    if (clientTable) {
      this.clientName = clientTable.clientName;
      this.tableNumber = clientTable.tableNumber;
    }
    console.log('Constructor - clientName:', this.clientName);
    console.log('Constructor - tableNumber:', this.tableNumber);
  }
  onOrderStarted(eventData: { clientName: string; tableNumber: string }) {
    this.clientName = eventData.clientName;
    this.tableNumber = eventData.tableNumber;
  }
  
  ngOnInit() {
    const clientTable = this.orderService.getClientTable();
    if (clientTable) {
      this.clientName = clientTable.clientName;
      this.tableNumber = clientTable.tableNumber;
    }
    console.log('ngOnInit - clientName:', this.clientName);
    console.log('ngOnInit - tableNumber:', this.tableNumber);
  }
  

  calculateTotal(): number {
    return this.selectedProducts.reduce((total, product) => total + (product.count * product.price), 0);
  }

  toggleSummary() {
    this.showSummary = !this.showSummary;
  }

  incrementProduct(product: any) {
    this.orderService.addProduct(product);
  }

  decrementProduct(product: any) {
    this.orderService.removeProduct(product);
  }

  createOrder() {
    const clientTable = this.orderService.getClientTable(); // Obter o nome do cliente e número da mesa
    if (!clientTable || !clientTable.clientName || !clientTable.tableNumber) {
      console.log('Nome do cliente ou número da mesa não definidos.');
      return;
    }
  
    const orderData = {
      userId: '4', // Obter o ID do usuário logado
      client: clientTable.clientName, // Usar o nome do cliente obtido
      table: clientTable.tableNumber, // Usar o número da mesa obtido
      products: this.selectedProducts.map(product => {
        return {
          qty: product.count,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type
          }
        };
      }),
      status: 'pending',
      dateEntry: new Date().toISOString(),
      dateProcessed: new Date().toISOString()
    };
  
    this.orderService.createOrder(orderData).subscribe(
      response => {
        // Lógica a ser executada após o envio bem-sucedido
        console.log('Pedido enviado com sucesso:', response);
      },
      error => {
        // Lógica a ser executada em caso de erro no envio
        console.error('Erro ao enviar o pedido:', error);
      }
    );
  }
}
