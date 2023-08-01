import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogin(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (response) => {
        if (response.success) {
          console.log('Login valido');
          this.router.navigate(['/clienttable']);
        } else {
          console.log('Login inválido');
        }
      },
      (error) => {
        console.error('Erro na autenticação:', error);
      }
    );
  }
}
