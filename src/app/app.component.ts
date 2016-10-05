import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store, Action } from '@ngrx/store';

import { IAppState, CurrentUserActions } from './shared';
import { GoogleProfileService } from './google/google.module';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
    </h1>

    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private redirectLoginSubscription: Subscription;
  private getUserdataSubscription: Subscription;
  private redirectRoomSubscription: Subscription;

  constructor (private router: Router, private store: Store<IAppState>, private profileService: GoogleProfileService) {
  }

  ngOnInit() {
    let tokenSource = this.store.map(s => s.token);
    let currentUserSource = this.store.map(s => s.currentUser);

    tokenSource.filter(token => !token).subscribe(() =>
      this.router.navigate(['login'])
    );

    tokenSource.combineLatest(currentUserSource).filter((token, currentUser) =>
      // we have a token, but not any user data yet 
      !!token && !currentUser
    ).flatMap((token, currentUser) =>
      this.profileService.getCurrentUser()
    ).subscribe(currentUser =>
      this.store.dispatch({
        type: CurrentUserActions.UPDATE,
        payload: currentUser
      })
    );

    tokenSource.combineLatest(currentUserSource).filter((token, currentUser) => 
      !!token && !!currentUser
    ).subscribe(() =>
      this.router.navigate(['rooms'])
    );
  }

  ngOnDestroy() {
    this.redirectLoginSubscription.unsubscribe();
    this.getUserdataSubscription.unsubscribe();
    this.redirectRoomSubscription.unsubscribe();
  }
}
