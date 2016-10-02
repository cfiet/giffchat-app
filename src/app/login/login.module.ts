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
    {provide: GOOGLE_AUTH_CLIENT_ID, useValue: '583394613108-l7igdv6vhv2ti676ms9k1jho3oamcgnh.apps.googleusercontent.com'},
    UserService
  ]
})
export class LoginModule { }
