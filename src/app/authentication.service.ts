import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login(email: string, password: string) {
    const isValidUser = email === 'garconete@fritokas.com' && password === '123456';
    return of({ success: isValidUser });
  }
}
