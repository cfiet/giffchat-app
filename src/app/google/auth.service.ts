import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs';

import {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_REQUEST_TOKEN_URL,
  GOOGLE_AUTH_RESPONSE_TYPE,
  GOOGLE_AUTH_SCOPE,
  GOOGLE_AUTH_VERIFY_TOKEN_URL,
  GOOGLE_TOKEN_STORE_NAME
} from './constants';

import { IUnverifiedToken, IVerifiedToken, TOKEN_STORE, ITokenStoreService } from '../token/token.module';

export interface ITokenValidation {
  token: IVerifiedToken;
  audience: string;
  userId: string;
};

interface IVerificationResponse {
  aud: string;
  scope: string;
  expires_in: number;
}

@Injectable()
export class GoogleAuthService {

  private queryEncoder = new QueryEncoder();

  constructor(
    @Inject(GOOGLE_AUTH_CLIENT_ID) private clientId: string,
    @Inject(GOOGLE_AUTH_REQUEST_TOKEN_URL) private requestTokenUrl: string,
    @Inject(GOOGLE_AUTH_RESPONSE_TYPE) private responseType: string,
    @Inject(GOOGLE_AUTH_SCOPE) private scope: string,
    @Inject(GOOGLE_AUTH_VERIFY_TOKEN_URL) private verifyUrl: string,
    @Inject(GOOGLE_TOKEN_STORE_NAME) private tokenStoreName: string,
    @Inject(TOKEN_STORE) private tokenStore: ITokenStoreService,
    private http: Http
  ) {}

  private toSearchParams(v: {name:string,value:string}[]): URLSearchParams {
    const value = new URLSearchParams('', this.queryEncoder);
    if (v) {
      v.forEach(i => value.set(i.name, i.value));
    }
    return value;
  }

  public authenticate(returnUri: string): void {
    if (!returnUri || returnUri.length === 0) {
      throw new Error('Return URL cannot be empty');
    }

    const rawParams = [
      { name: 'response_type', value: this.responseType },
      { name: 'scope', value: this.scope },
      { name: 'client_id', value: this.clientId },
      // This must be the last parameter in the URI
      { name: 'redirect_uri', value: returnUri }
    ];

    const target = `${this.requestTokenUrl}?${this.toSearchParams(rawParams)}`;
    window.location.replace(target);
  }

  public verify(token: IUnverifiedToken): Observable<ITokenValidation> {
    const params = this.toSearchParams([
      {name: 'access_token', value: token.value}
    ]);

    const tokenStorage = this.http.get(this.verifyUrl, {
      search: params
    }).map(response => {
      if (!response.ok) {
        switch(response.status) {
          case 400:
            throw new Error(`Token verification request failed: ${response.json().error}`);

          default:
            throw new Error(`Token verification request failed: ${response.statusText}`);
        }
      }

      return <IVerificationResponse> response.json();
    }).map(verificationResponse => {
      if (this.clientId !== verificationResponse.aud) {
        throw new Error(`Token is not issued for this application`);
      }

      const requestedScopes = this.scope.split(' ');
      const tokenScopes = verificationResponse.scope.split(' ');
      if (!requestedScopes.every(s =>
        tokenScopes.some(ts =>
          !!ts.match(`.+${s}\$`)
        )
      )) {
        throw new Error(`Token scopes do not cover all the requested scopes.
          Requested scopes: ${this.scope},
          Token scopes: ${verificationResponse.scope}`
        );
      }

      return <ITokenValidation> {
        audience: verificationResponse.aud,
        token: {
          value: token.value,
          type: token.type,
          expires: token.expires
        }
      };
    });

    tokenStorage.subscribe(validation => {
      this.tokenStore.set(this.tokenStoreName, validation.token);
    });

    return tokenStorage;
  }
}
