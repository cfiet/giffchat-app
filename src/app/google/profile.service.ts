import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { TokenStoreService } from '../token/token.module';

import {
  GOOGLE_PROFILE_URL,
  GOOGLE_TOKEN_STORE_NAME
} from './constants';

@Injectable()
export class GoogleProfileService {

  constructor(
    @Inject(GOOGLE_TOKEN_STORE_NAME) private googleTokenName: string,
    @Inject(GOOGLE_PROFILE_URL) private profileUrl: string,
    private tokenStorage: TokenStoreService,
    private http: Http
  ) { }

  public getCurrentUser(): Observable<any> {
    return this.tokenStorage.get(this.googleTokenName).flatMap(token => {
      return this.http.get(`${this.profileUrl}/me`, {
        headers: new Headers({
          'Authorization': `Bearer ${token.value}`
        })
      }).map(response => {
        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        return response.json();
      });
    });
  }
}