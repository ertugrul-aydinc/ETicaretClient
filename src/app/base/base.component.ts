import { Component } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {

  /**
   *
   */
  constructor(private spinner : NgxSpinnerService) {
  }

  showSpinner(spinnerType: SpinnerType){
    this.spinner.show(spinnerType);

    setTimeout(() => this.hideSpinner(spinnerType), 1000);
  }

  hideSpinner(spinnerType: SpinnerType){
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType{
  SquareJellyBox = "s1",
  BallScaleMultiple = "s2",
  BallSpinFade = "s3"
}
