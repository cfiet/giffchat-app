import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LocalStorageTokenStore,
  TOKEN_STORAGE_PREFIX,
  LOCAL_STORAGE_PREFIX,
  TOKEN_STORE
} from './token.store.service';

export * from './token';
export * from './token.store.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {provide: TOKEN_STORE, useClass: LocalStorageTokenStore},
    {provide: LOCAL_STORAGE_PREFIX, useValue: 'giffchat'},
    {provide: TOKEN_STORAGE_PREFIX, useValue: 'token-storage'},
    {provide: Window, useValue: window}
  ]
})
export class TokenModule { }