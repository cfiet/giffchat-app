import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { GOOGLE_AUTH_CLIENT_ID } from './google/google.module';
import { appRouter } from './app.routing';
import { environment } from '../environments/environment';

import {currentUserReducer} from './user';
import {tokenReducer} from './token';

const store = StoreModule.provideStore({
  currentUser: currentUserReducer,
  token: tokenReducer
}, {
  currentUser: null,
  token: null
});

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    appRouter,
    store
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: GOOGLE_AUTH_CLIENT_ID, useValue: environment.googleClientId},
  ]
})
export class AppModule { }
