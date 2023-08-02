import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienttableComponent } from './components/clienttable/clienttable.component';
//import { AuthGuard } from './auth.guard';
import { CafedamanhaComponent } from './components/cafedamanha/cafedamanha.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clienttable', component: ClienttableComponent },
  { path: 'cafedamanha', component: CafedamanhaComponent, /*canActivate: [AuthGuard]*/ },
  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
