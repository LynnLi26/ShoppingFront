import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../Model/cartModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [] };
    cartTest = new BehaviorSubject<Cart>({ items: []});
    cart$ = this.cartTest.asObservable();

    constructor() { }

    addToCart(item: CartItem) {
        const items = [...this.cartTest.value.items];
        const existingItems = this.cartTest.value.items.find(_item => _item.id === item.id);

        if(existingItems) {
            existingItems.quantity++;
        } else {
            items.push(item);
        }

        this.cartTest.next({items})
        console.log(this.cartTest.value);
    }

    getCartItems(): Array<CartItem> {
        return this.cart.items;
    }

    getTotal(items: Array<CartItem>): number {
        return items
          .map((item) => item.price * item.quantity)
          .reduce((prev, current) => prev + current, 0);
      }

    removeFromCart(item: CartItem): Array<CartItem> {
        const filterItems = this.cartTest.value.items.filter(
            (_item) => _item.id !== item.id
        );

        this.cartTest.next({ items: filterItems});
        return filterItems;
    }

    RemoveQuantity(item: CartItem): Array<CartItem> {
        let itemForRemoval: CartItem | undefined;

        let filteredItem = this.cartTest.value.items.map((_item) => {
            if(_item.id == item.id) {
                _item.quantity--;

                if(_item.quantity == 0) {
                    itemForRemoval = _item;
                }
            }
            return _item;
        });

        if(itemForRemoval) {
            filteredItem = this.removeFromCart(itemForRemoval);
        }
        return filteredItem;
    }

    getQuantity(): number {
        return this.cartTest.value.items.length;
    }

}
