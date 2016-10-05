import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {ITokenState, ICurrentUser} from '../shared';

import {
  GOOGLE_PROFILE_URL,
  GOOGLE_TOKEN_STORE_NAME
} from './constants';

@Injectable()
export class GoogleProfileService {

  constructor(
    @Inject(GOOGLE_TOKEN_STORE_NAME) private googleTokenName: string,
    @Inject(GOOGLE_PROFILE_URL) private profileUrl: string,
    private store: Store<ITokenState>,
    private http: Http
  ) {
  }

  public getCurrentUser(): Observable<ICurrentUser> {
    return this.store.map(s => s.token).filter(t =>
      !!t
    ).flatMap(token => {
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