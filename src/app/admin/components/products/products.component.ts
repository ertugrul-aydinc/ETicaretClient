import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService:HttpClientService) {
    super(spinner)
   }

  ngOnInit(): void {
      this.showSpinner(SpinnerType.SquareJellyBox)

    
    

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   stock:100,
    //   price:15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller:"products",
    // },{
    //   id:"db9ca79e-a25f-4797-9f63-5ce5315b1e43",
    //   name:"Renkli Kagit",
    //   stock:1500,
    //   price:5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller:"products"
    // },
    // "799d8ac7-543c-45f3-947c-33e27354f00f").subscribe();

    // this.httpClientService.get({
    //   fullEndpoint : "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data));

    // this.httpClientService.post<Product>({
    //   controller:"products",
    //   action:"add"
    // },{
    //   name:"Elma",
    //   stock:15,
    //   price:22
    // }).subscribe();

  }

  @ViewChild(ListComponent) listComponents : ListComponent

    createdProduct(createdProduct : Create_Product){
      this.listComponents.getProducts();
    }

}
