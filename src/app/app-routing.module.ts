import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClienttableComponent } from './components/clienttable/clienttable.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clienttable', component: ClienttableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
