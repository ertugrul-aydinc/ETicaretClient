import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from '../../../../services/common/models/product.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private fileService:FileService,
              private basketService:BasketService,
              spinner:NgxSpinnerService,
              private toastrService:CustomToastrService)
              {
                super(spinner)
              }

  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  pageSize:number = 12;
  pageList:number[] = [];
  baseUrl:BaseUrl;



  products:List_Product[];

  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);


      const data:{totalProductCount:number, products:List_Product[]} = await this.productService.list(this.currentPageNo-1, this.pageSize, () => {

      }, errorMessage => {
  
      });
  
      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {
          
        const listProduct : List_Product = {
          id:p.id,
          createdDate:p.createdDate,
          imagePath:p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name:p.name,
          price:p.price,
          stock:p.stock,
          updatedDate:p.updatedDate,
          productImageFiles:p.productImageFiles
        };

        
        return listProduct;
      })



      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if(this.currentPageNo -3 <= 0){
        for (let index = 1; index <= 7; index++) {
          this.pageList.push(index);
        }
      }
      else if(this.currentPageNo + 3 >= this.totalPageCount){
        for (let index = this.currentPageNo-6; index < this.totalPageCount; index++) {
          this.pageList.push(index);
        }
      }
      else{
        for (let index = this.currentPageNo-3; index < this.currentPageNo+3; index++) {
          this.pageList.push(index);
        }
      } 
    });
    
  }

  async addToBasket(product: List_Product){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    let _basketItem:Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.toastrService.message("Ürün sepete eklenmiştir.","Sepete Eklendi !",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    })
  }

}
