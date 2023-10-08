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
      const isValidLogin = await this.authService.login(this.email, this.password);

      if (isValidLogin) {
        console.log("Login válido");

        // Após um login bem-sucedido, obtenha o papel do usuário
        const userRole = this.authService.getUserRole();

        // Redirecione com base no papel do usuário
        if (userRole === 'user') {
          this.router.navigate(['/clienttable']);
        } else if (userRole === 'kitchen') {
          this.router.navigate(['/kitchen']);
        } else {
          // Lógica para outros papéis, se necessário
          console.log("Papel de usuário desconhecido");
          console.log("Papel do usuário:", userRole);

        }
      } else {
        console.log("Login inválido");
        this.loginError = true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      this.loginError = true;
    }
  }
}
