import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartNumService {

  private cartNum: number = 0;

  constructor(private carts: CartService) {}
  
    setCartNum(num: number) {
        this.cartNum = num;
    }

    getCarNum() {
        return this.cartNum;
    }
}
