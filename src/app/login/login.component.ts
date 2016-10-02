import { Component, OnInit } from '@angular/core';

import { GoogleAuthService } from '../google/google.module';

@Component({
  selector: 'app-login',
  template: `
    <div class="login">
      Please log in into the application

      <button (click)="onGoogleLogin()">Log in using Google Account</button>
    </div>
  `
})
export class LoginComponent implements OnInit {

  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit() {
  }

  public onGoogleLogin(): void {
    const returnUrl = `${window.location.href}/google`;
    this.googleAuth.authenticate(returnUrl);
  }
}
