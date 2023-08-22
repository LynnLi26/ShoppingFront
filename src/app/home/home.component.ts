import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../Model/Product';
import { Subscription } from 'rxjs';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  category: string | undefined;

  products: Array<Product> | undefined;
  productsSubscription: Subscription | undefined;

  count: number = 0;

  constructor(private storeService : StoreService){}

  ngOnInit(): void {
    this.getProducts();
  }

  onShowCategory(newCategory: string):void{
    this.productsSubscription = this.storeService.getProductBySize(newCategory).subscribe((_products) => {
      this.products = _products;
      this.count = _products.length;
    });
  }

  getProducts(){
    this.productsSubscription = this.storeService.getAllProducts().subscribe((_products) => {
      this.products = _products;
      this.count = _products.length;
    });
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }

}
