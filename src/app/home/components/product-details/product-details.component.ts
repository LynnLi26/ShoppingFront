import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product: any;
  id : number;

  displayedColumns: string[] = ['property', 'value'];
  dataSource: MatTableDataSource<any>;;

  constructor(private products : StoreService, private act: ActivatedRoute){};

  ngOnInit(): void {
    this.act.params.subscribe(
      params => {
        this.id = params['id'];
        this.products.getProductsById(this.id).subscribe((data) => {
          this.product = data;
          this.dataSource = new MatTableDataSource([
            { property: 'ID', value: this.product.id },
            { property: 'Title', value: this.product.title },
            { property: 'Description', value: this.product.description },
            { property: 'Style', value: this.product.style },
            { property: 'Price', value: this.product.price },
          ])
        });
      }
    )
  }
}
