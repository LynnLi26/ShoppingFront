import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { Cart, CartItem } from 'src/app/Model/cartModel';
import { CartService } from 'src/app/services/cart.service';
import { CartNumService } from 'src/app/services/cart-num.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('slideInOut', [
      state('open', style({ right: '0' })),
      state('closed', style({ right: '-30%' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})

export class CartComponent implements OnInit{
  isOpen: boolean = false;
  cart: Cart = { items: [{
    product: 0,
    title: '',
    style: '',
    price: 150,
    quantity: 1,
    size: '',
    id: 1
  } ]};
  totalPrice: number = 0;

  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = [
    'product',
    'description',
    'total',
    'action'
  ];

  count: number;

  constructor(private cartService: CartService,
              private cartNum: CartNumService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    //this.dataSource = this.cart.items;
    this.cartService.cart$.subscribe(updateCart => {
      this.dataSource = updateCart.items;
      this. totalPrice = this.getTotal(updateCart.items);
      this.count = updateCart.items.length;
    }); 
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onRemoveFromCart(item: CartItem): void {
    this.dataSource = this.cartService.removeFromCart(item); 
    this. totalPrice = this.getTotal(this.dataSource);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
    this.cartService.cart$.subscribe(updateCart => {
      this.count = updateCart.items.length;
      console.log(this.count);
      this.cdr.detectChanges();
      console.log("new item:" + JSON.stringify(updateCart.items));
    })
       
  }

  onRemoveQuantity(item: CartItem):void {
    this.dataSource = this.cartService.RemoveQuantity(item);
    this. totalPrice = this.getTotal(this.dataSource);
    this.count--;
    this.cdr.detectChanges();
    console.log(this.count);
  }

  generatePDF(dataSource: Array<CartItem>): void{
    const number = this.getTotal(this.dataSource);
    const total = parseFloat(number.toFixed(2));
    const docDefinition = {
      content: [
        {text: 'Product List', style: 'header'},
        '\n\n',
        {
          ul: dataSource.map(data => data.title + ' ' + data.style + ' - $' + data.price)
        },
        '\n\n',
        {
          text: 'Total Price: ' + number
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };
    pdfMake.createPdf(docDefinition).download('product-list.pdf');
  }

}