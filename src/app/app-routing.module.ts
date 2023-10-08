import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienttableComponent } from './components/clienttable/clienttable.component';
import { MenuComponent} from './components/menu/menu.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clienttable', component: ClienttableComponent, canActivate: [AuthGuard], data: { expectedRole: 'user' } },
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard], data: { expectedRole: 'kitchen' } },
  { path: 'cafedamanha', component: MenuComponent, canActivate: [AuthGuard], data: { expectedRole: 'user' } },
  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
