import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productName = 'A product';
  isDisabled = true;
  constructor() {
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit(): void {
  }

}
