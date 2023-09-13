import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoComponent } from './components/logo/logo.component';
import { ClienttableComponent } from './components/clienttable/clienttable.component';
import { AuthService} from './authentication.service';
import { __importDefault } from 'tslib';
import { MenucardComponent } from './components/menucard/menucard.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './order.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    ClienttableComponent,
    MenucardComponent,
    MenuComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
