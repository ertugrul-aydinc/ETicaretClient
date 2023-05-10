import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatButton } from '@angular/material/button';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType } from 'src/app/base/base.component';

declare var $:any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit,OnDestroy{

  constructor(
    dialogRef : MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private spinner:NgxSpinnerService,
    private toastrService:CustomToastrService,
    private productService:ProductService
  )
  {
    super(dialogRef)
  }



  @ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent
  @ViewChild("txtStock",{static:true}) txtStock:ElementRef

  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e){

    this.spinner.show(SpinnerType.BallSpinFade);

    const data:any = (e as {data:string}).data;

    if(data != null && data != ""){
      const jsonData = JSON.parse(data);
    const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;
    

    this.productService.updateStockQrCodeToProduct(jsonData.id, parseInt(stockValue),() => {
      $("btnClose").click()

    this.toastrService.message(`${jsonData.Name} ürününün stok bilgisi ${stockValue} olarak güncellenmiştir`, "Stok Başarıyla Güncellendi",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    });
    this.spinner.hide(SpinnerType.BallSpinFade);
    })
    }
    

    

  }

}
