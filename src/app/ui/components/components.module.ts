import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { AboutComponent } from './about/about.component';
import { AboutModule } from './about/about.module';



@NgModule({
  declarations: [
    
  
    
  
   
  
    
  ],
  imports: [
    AboutModule,
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    //LoginModule
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
