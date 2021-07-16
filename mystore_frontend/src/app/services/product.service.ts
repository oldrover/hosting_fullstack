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
    //return this.http.get<Product[]>("http://localhost:3000/products");
    return this.http.get<Product[]>("http://nochntest-env.eba-d4mt3wur.eu-central-1.elasticbeanstalk.com:3000/products");
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://nochntest-env.eba-d4mt3wur.eu-central-1.elasticbeanstalk.com:3000/products/` + id);
  }
}
