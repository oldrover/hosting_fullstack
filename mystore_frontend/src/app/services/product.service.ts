import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("https://fakestoreapi.com/products");
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/` + id);
  }
}
