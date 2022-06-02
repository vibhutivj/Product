import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderServiceService } from './service/order-service.service';

@Component({
  selector: 'my-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  selectedProducts: Array<Product> = [];
  productLoading: boolean = false;
  product$: Observable<Product[]> | undefined;
  productInput$ = new Subject<string>();
  searchString: string = '';
  products: Array<Product> = [];
  totalCount = 0;

  pageSize = 25;
  offSet = 0;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.initLoad();
  }

  trackByFn(item: Product) {
    return item.productId;
  }

  initLoad() {
    this.productLoading = true;
    this.orderService.getProducts(this.pageSize, this.offSet, this.searchString).subscribe(
      (res) => {
        this.products = [...res.data];
        this.totalCount = res.totalCount[0].totalCount;
        this.productLoading = false;
      },
      (err) => {
        this.products = [];
        this.totalCount = 0;
        this.productLoading = false;
      }
      );
  }

  addonLoad() {
    this.productLoading = true;
    this.orderService.getProducts(this.pageSize, this.offSet, this.searchString).subscribe(
      (res) => {
        this.products = [...this.products,...res.data];
        // this.totalCount = res.totalCount[0].totalCount;
        this.productLoading = false;
      },
      (err) => {
        this.products = [];
        this.totalCount = 0;
        this.productLoading = false;
      }
      );
  }

  onScrollToEnd() {
    if(this.products.length < this.totalCount) {
      this.offSet = this.offSet + this.pageSize;
      this.addonLoad();
    }
  }

  onSearch(event: any) {
    console.log(event);
    this.searchString = event.term;
    this.offSet = 0;
    this.initLoad();
  }

  onAdd(event: any) {
    console.log(event);
    event.quantity = 1;
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
    this.selectedProducts = [...this.selectedProducts];
  }

  getTotal() {
    let total: number = 0;;
    this.selectedProducts.forEach(x => {
      total = total + (x.quantity*x.productPrice);
    });
    return total.toFixed(2);
  }
}


interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
}
