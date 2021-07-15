import { Component, OnInit} from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { faTimesCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Product[] = this.cartService.getCartProducts();
  total: number = 0;
  empty: boolean = true;
  num: number[] = [1,2,3,4,5,6,7,8,9,10];  

  faRemove = faTimesCircle;
  faOk = faCheckCircle;
  faWrong = faExclamationCircle;

  name: string = "";
  address: string = "";
  creditcard: string = "";

  constructor(
    private cartService: CartService, 
    private router: Router,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {    
    this.loadCart();     
  }

  submitOrder(): void {    
    this.router.navigate(['confirmation'],{ queryParams: {name: this.name,total: this.total }});
    this.cartService.clearCart();
  }

  removeFromCart(product: Product, content: any): void {
    this.cartService.removeProductFromCart(product);
    this.openModal(content);
    this.products = this.cartService.getCartProducts();
    this.loadCart();
  }

  loadCart() {
    if (this.products.length > 0) {
      this.total = this.products.reduce((prev, cur) => {
        return prev + (cur.price * cur.amount);
      }, 0);
      this.empty = false;
    }
    else{
      this.empty = true;
    }
  }

  onChange(newAmount: number, id: number) {    
    this.cartService.changeAmount(newAmount, id);
    this.products = this.cartService.getCartProducts();
    this.loadCart();

  }

  openModal(content: any) {
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });
    setTimeout(() => {
      this.modalService.dismissAll();
    },2000);
  }
}
