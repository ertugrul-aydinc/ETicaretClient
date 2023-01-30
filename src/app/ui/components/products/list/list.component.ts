import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from '../../../../services/common/models/product.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private fileService:FileService){}

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



}
