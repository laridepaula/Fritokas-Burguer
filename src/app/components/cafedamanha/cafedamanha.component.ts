import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication.service';

@Component({
  selector: 'app-cafedamanha',
  templateUrl: './cafedamanha.component.html',
  styleUrls: ['./cafedamanha.component.css']
})
export class CafedamanhaComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      const urlBackend = 'http://localhost:8080/products';
      this.http.get<any[]>(urlBackend, { headers }).subscribe((data) => {
        this.products = data;
      });
    }

  }
}
