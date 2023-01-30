import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService : AuthService,
              private toastrService : CustomToastrService,
              private router : Router,
              private httpClientService:HttpClientService)
    
    
              {


                  authService.identityCheck();
              }

    signOut(){
      localStorage.removeItem("accessToken");
      this.authService.identityCheck();
      this.router.navigate([""]);
      this.toastrService.message("Oturum kapatılmıştır.","Oturum Kapatıldı !",{
        messageType : ToastrMessageType.Info,
        position : ToastrPosition.TopRight
      })
    }
    
  }

  


