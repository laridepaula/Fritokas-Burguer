import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const isLoggedIn = this.authService.login(this.email, this.password);
    if (isLoggedIn) {
      console.log("login valido")
      this.router.navigate(['/clienttable']);
    } else {
      console.log("login invalido")
      this.loginError = true;
    }
  }
}
