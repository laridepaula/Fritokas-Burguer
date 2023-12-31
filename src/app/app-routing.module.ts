import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienttableComponent } from './components/clienttable/clienttable.component';
//import { AuthGuard } from './auth.guard';
import { MenuComponent} from './components/menu/menu.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clienttable', component: ClienttableComponent },
  { path: 'cafedamanha', component: MenuComponent, /*canActivate: [AuthGuard]*/ },
  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
