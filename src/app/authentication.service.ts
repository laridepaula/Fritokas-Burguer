import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const userLogin = { email, password };
      const response = await firstValueFrom(this.http.post<any>(this.apiUrl, userLogin));
      console.log(response)
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        this.isAuthenticated = true;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('token') !== null;
  }

}
