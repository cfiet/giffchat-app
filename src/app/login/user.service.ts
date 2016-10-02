import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private _authenticated: boolean = false;

  constructor() { }

  get authenticated (): boolean {
    return this._authenticated;
  }
}
