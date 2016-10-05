import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { GoogleAuthService, GoogleProfileService, TokenParser, ITokenValidation } from '../google/google.module';
import { TokenActions, IAppState } from '../shared';

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
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.tokenVerification = Observable.from(this.route.fragment).flatMap(fragment => {
      this.isVerifying = true;
      const token = TokenParser.parseString(fragment);
      return this.authService.verify(token);
    }).subscribe(
      (v) =>
        this.store.dispatch({
          type: TokenActions.STORE,
          payload: v
        }),
      (e) =>
        console.error(e),
      () =>
        this.isVerifying = false
    );
  }

  public ngOnDestroy() {
    this.tokenVerification.unsubscribe();
  }
}