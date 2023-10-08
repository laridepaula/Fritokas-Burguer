import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  orders: any[] = [];

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        this.orders = response;
        console.log('Lista de pedidos:', this.orders);
        
        // Atualize o status dos pedidos com base na resposta da API
        this.updateOrderStatusFromApiResponse();
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error);
      }
    );
  }
  
  updateOrderStatusFromApiResponse() {
    this.orders.forEach((order) => {
      const orderId = order.id;
      const statusFromApiResponse = order.status; // Certifique-se de usar a chave correta na resposta da API
  
      // Atualize o status no OrderService com base na resposta da API
      this.orderService.setStatus(orderId, statusFromApiResponse);
    });
  }
  
  updateOrderStatus(orderId: number) {
    const currentStatus = this.orderService.getStatus(orderId);
    let newStatus = '';

    if (currentStatus === 'pendente') {
      newStatus = 'fazendo';
    } else if (currentStatus === 'fazendo') {
      newStatus = 'feito';
    } else if (currentStatus === 'feito') {
      newStatus = 'encerrado';
    }

    this.orderService.updateOrderStatus(orderId).subscribe(
      (response) => {
        console.log('Status atualizado com sucesso:', response);
        this.fetchOrders();
      },
      (error) => {
        console.error('Erro ao atualizar o status:', error);
      }
    );
  }

  getButtonClass(orderId: number): string {
    const currentStatus = this.orderService.getStatus(orderId);
  
    if (currentStatus === 'pendente') {
      return 'pending-btn';
    } else if (currentStatus === 'fazendo') {
      return 'in-progress-btn';
    } else if (currentStatus === 'feito') {
      return 'completed-btn';
    } else {
      return ''; // Adicione a classe para "feito" aqui
    }
  }
}
