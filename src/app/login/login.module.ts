import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GoogleComponent } from './google.component';
import { GoogleModule, GOOGLE_AUTH_CLIENT_ID } from '../google/google.module';
import { UserService } from './user.service';
import { loginRouting } from './login.routes';

export { LoginComponent, GoogleComponent, UserService };

@NgModule({
  imports: [CommonModule, GoogleModule, loginRouting],
  declarations: [LoginComponent, GoogleComponent],
  exports: [LoginComponent, GoogleComponent],
  providers: [
    UserService
  ]
})
export class LoginModule { }
