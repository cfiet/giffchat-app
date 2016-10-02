import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { IVerifiedToken } from './token';

export interface ITokenStoreService {
  set(name: string, token: IVerifiedToken): void;

  get(name: string): Observable<IVerifiedToken>;
}

export const LOCAL_STORAGE_PREFIX = 'Storage.Prefix';
export const TOKEN_STORAGE_PREFIX = 'Token.Storage.Prefix';
export const TOKEN_STORE = 'Token.Storage';

export class LocalStorageTokenStore implements ITokenStoreService {
  private localStorage: Storage;

  constructor(
    @Inject(LOCAL_STORAGE_PREFIX) private storagePrefix: string,
    @Inject(TOKEN_STORAGE_PREFIX) private tokenStoragePrefix: string
  ) {
    this.localStorage = window.localStorage;
  }

  private getKey(name: string): string {
    return [this.storagePrefix, this.tokenStoragePrefix, name].join('::');
  }

  public set(name: string, token: IVerifiedToken): void {
    const key = this.getKey(name);
    this.localStorage.setItem(key, JSON.stringify(token));
  }

  public get(name: string): Observable<IVerifiedToken> {
    const key = this.getKey(name);
    const serializedToken = this.localStorage.getItem(key);

    if (!serializedToken) {
      return Observable.throw(`No token avaliable under name; ${name}`);
    }
    const token = <IVerifiedToken> JSON.parse(serializedToken);
    const tokenExpirationDate = new Date(token.expires);
    if (tokenExpirationDate < new Date()) {
      return Observable.throw(`Token expired at ${tokenExpirationDate}`);
    }
    return Observable.of(token);
  }
}