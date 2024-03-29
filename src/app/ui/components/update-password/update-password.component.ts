import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,
              private userAuthService:UserAuthService,
              private activatedRoute:ActivatedRoute,
              private alertifyService:AlertifyService,
              private userService:UserService,
              private router:Router){
    super(spinner);
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinFade);
    this.activatedRoute.params.subscribe({
      next:async params => {
        const userId:string = params["userId"];
        const resetToken:string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.state = true;
          this.hideSpinner(SpinnerType.BallSpinFade);
        })
      }
    })
  }

  updatePassword(password:string,passwordConfirm:string){
    this.showSpinner(SpinnerType.BallSpinFade);
    if(password != passwordConfirm){
      this.alertifyService.message("Şifreler Eşleşmiyor",{
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      this.hideSpinner(SpinnerType.BallSpinFade);
      return;
    }
    this.activatedRoute.params.subscribe({
      next: async params=>{
        const userId:string = params["userId"];
        const resetToken:string = params["resetToken"];
        await this.userService.updatePassword(userId,resetToken,password,passwordConfirm, () => {
          this.alertifyService.message("Şifre Başarıyla Güncellenmiştir!",{
            messageType:MessageType.Message,
            position:Position.TopRight
          })
          this.router.navigate(["/login"]);
        },
        error=>{
          console.log(error);
        });
        this.hideSpinner(SpinnerType.BallSpinFade);
      }
    })     
  }
}
