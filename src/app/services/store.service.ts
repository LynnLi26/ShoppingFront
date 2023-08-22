import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  readonly rootUrl = 'https://myshoppingwebapi.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(this.rootUrl+'api/Product/api/GetProductList');
  }

  getProductBySize(size: string):Observable<Array<Product>>{
    const params = new HttpParams().set('size',size);
    return this.http.get<Array<Product>>(this.rootUrl+'api/Product/api/GetProductBySize',{params});
  }

  getProductsById(id: number){
    return this.http.get(this.rootUrl + "api/Product/api/GetProductById?id=" + id);
  }
}
