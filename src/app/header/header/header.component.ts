import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartComponent } from 'src/app/home/components/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog){}
  
  openCartPopup() {
    const dialogRef: MatDialogRef<CartComponent> = this.dialog.open(CartComponent, {
      width: '80%',
      panelClass: 'right-side-dialog'
    });
    debugger;
  }
}
