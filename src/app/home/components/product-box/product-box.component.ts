import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Model/Product';
import { CartNumService } from 'src/app/services/cart-num.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() product: Product | undefined;
  show: boolean = false;
  text: string = 'Free Shipping';
  selectedSizeMap: { [productId: number]: string | null } = {};
  
  isHovered: boolean = false;

  constructor(private cartService : CartService, private cartNum : CartNumService){}

  onCardHover(hovered: boolean){
    this.isHovered = hovered;
  }

  onAddToCart(product: Product) {
    const selectSize = this.selectedSizeMap[product.id];

    this.cartService.addToCart({
      product: product.sku,
      title: product.title,
      style: product.style,
      price: product.price,
      quantity: 1,
      size: selectSize,
      id: product.id
    });

    this.cartNum.setCartNum(this.cartNum.getCarNum() + 1);
  }
}
