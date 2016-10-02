import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStore, MemoryUserStore } from './user.store.service';

export * from './user';
export * from './user.store.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {provide: UserStore, useClass: MemoryUserStore}
  ]
})
export class UserModule { }