import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  clientName: string = '';
  tableNumber: string = '';
  menuVisible: boolean = false;
  orderStarted: boolean = false;
  selectedMenuType: string = '';

  constructor(private http: HttpClient) { }

  private isFormValid(): boolean {
    return this.clientName.trim() !== '' && this.tableNumber.trim() !== '';
  }

  startOrder() {
    if (!this.isFormValid()) {
      console.log('Order failed');
      return;
    }

    const orderData = {
      clientName: this.clientName,
      tableNumber: this.tableNumber,
    };

    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const urlBackend = 'http://localhost:8080/orders';
      this.http.post(urlBackend, orderData, { headers }).subscribe((response) => {
        console.log('Order started successfully:', response);
        this.orderStarted = true;
        this.menuVisible = true;
      });
    }
  }

  onMenuSelected(selectedType: string) {
    this.selectedMenuType = selectedType;
  }
}
