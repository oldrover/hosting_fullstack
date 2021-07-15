import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor() { 
    this.product = {
      id: 1,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      amount: 1
    }
  }

  ngOnInit(): void {
  }

}
