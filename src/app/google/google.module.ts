import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { GoogleAuthService } from './auth.service';
import { GoogleProfileService } from './profile.service';
import {
  GOOGLE_AUTH_REQUEST_TOKEN_URL,
  GOOGLE_AUTH_RESPONSE_TYPE,
  GOOGLE_AUTH_SCOPE,
  GOOGLE_AUTH_VERIFY_TOKEN_URL,
  GOOGLE_PROFILE_URL,
  GOOGLE_TOKEN_STORE_NAME
 } from './constants';

export * from './token.parser';
export * from './constants';
export * from './auth.service';
export * from './profile.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: GOOGLE_AUTH_SCOPE, useValue: 'profile'},
    {provide: GOOGLE_AUTH_RESPONSE_TYPE, useValue: 'token'},
    {provide: GOOGLE_PROFILE_URL, useValue: 'https://www.googleapis.com/plus/v1/people'},
    {provide: GOOGLE_AUTH_REQUEST_TOKEN_URL, useValue: 'https://accounts.google.com/o/oauth2/v2/auth'},
    {provide: GOOGLE_TOKEN_STORE_NAME, useValue: 'google'},
    {
      provide: GOOGLE_AUTH_VERIFY_TOKEN_URL,
      useValue: 'https://www.googleapis.com/oauth2/v3/tokeninfo'
    },
    GoogleAuthService,
    GoogleProfileService
  ]
})
export class GoogleModule { }
