import { OrderService} from 'src/app/order.service';
import { Component, EventEmitter, Output  } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private orderService: OrderService
  ) {}

  private isFormValid(): boolean {
    return this.clientName.trim() !== '' && this.tableNumber.trim() !== '';
  }
  @Output() orderStartedEvent = new EventEmitter<{ clientName: string; tableNumber: string }>();
  onOrderStarted(eventData: { clientName: string; tableNumber: string }) {
    this.clientName = eventData.clientName;
    this.tableNumber = eventData.tableNumber;
  }
  

  startOrder() {
    if (!this.isFormValid()) {
      console.log('Order failed');
      return;
    }
    
    this.orderService.setClientTable(this.clientName, this.tableNumber);
    this.orderStarted = true;
    this.menuVisible = true;
    
    const eventData = { clientName: this.clientName, tableNumber: this.tableNumber };
    this.orderStartedEvent.emit({ clientName: this.clientName, tableNumber: this.tableNumber });

    
    console.log('Name of the client:', this.clientName);
    console.log('Table number:', this.tableNumber);
  }

  onMenuSelected(selectedType: string) {
    this.selectedMenuType = selectedType;
  }

  get selectedProducts() {
    return this.orderService.selectedProducts;
  }

}
