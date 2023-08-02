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

  async onSubmit(): Promise<void> {
    try {
      this.loginError = false;
      const isLoggedIn = await this.authService.login(this.email, this.password);
      if (isLoggedIn) {
        console.log("login válido");
        this.router.navigate(['/clienttable']);
      } else {
        console.log("login inválido");
        this.loginError = true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      this.loginError = true;
    }
  }
}
