import { Component, OnInit, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit{

  constructor(
    dialogRef : MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private spinner:NgxSpinnerService,
    private qrCodeService : QrCodeService,
    private domSanitizer:DomSanitizer
  )
  {
    super(dialogRef)
  }


  qrCodeSafeUrl:SafeUrl;

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinFade);
    const qrCodeBlob:Blob = await this.qrCodeService.generateQRCode(this.data);

    const url:string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.BallSpinFade);
  }

}
