import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number = 1;
  quantity: number = 1;
  product: Product;
  faCart = faCartPlus; 
  
  amount: number = 1;  

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService,
    private modalService: NgbModal

    ) {
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
    this.route.params.subscribe(params => {
      this.id = params['id'];      
    });

    this.productService.getProductById(this.id).subscribe(product => {
      product["amount"] = 1;
      this.product= product;
    })
  }  

  addProductToCart(product: Product, content: any): void {
    product.amount= this.amount;
    this.cartService.addProductToCart(product);
    //window.alert("Product added to cart");    
    this.openModal(content);
    
  }

  handleMinus() {    
    this.amount--;  
  }
  handlePlus() {
    this.amount++;    
  }

  openModal(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });
  }
  
}
