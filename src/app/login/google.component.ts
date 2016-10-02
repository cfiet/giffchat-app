import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { GoogleAuthService, GoogleProfileService, TokenParser, ITokenValidation } from '../google/google.module';

@Component({
  selector: 'app-google',
  template: `
    <p>
      Logged in via Google!
    </p>
  `
})
export class GoogleComponent implements OnInit, OnDestroy {

  private isVerifying: boolean;
  private tokenVerification: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authService: GoogleAuthService,
    private profileService: GoogleProfileService
  ) { }

  public ngOnInit() {
    this.tokenVerification = Observable.from(this.route.fragment).flatMap(fragment => {
      this.isVerifying = true;
      const token = TokenParser.parseString(fragment);
      return this.authService.verify(token);
    }).subscribe(
      (v) => this.loginCompleted(v),
      (e) => this.loginFailed(e),
      () => this.isVerifying = false
    );
  }

  public ngOnDestroy() {
    this.tokenVerification.unsubscribe();
  }

  public loginCompleted(validation: ITokenValidation) {
    this.profileService.getCurrentUser().subscribe(
      (v) => console.log(v),
      (e) => console.error(e)
    );
  }

  public loginFailed(error: Error) {
    console.error(error);
  }
}