import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage = false;
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  sub!: Subscription;
  private _listFilter: string = '';

  constructor(private productService: ProductService) { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter();
  }

  performFilter(): IProduct[] {
    return this.products.filter(x => x.productName.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(value: string): void {
    this.pageTitle = 'Product List: ' + value;
  }

}