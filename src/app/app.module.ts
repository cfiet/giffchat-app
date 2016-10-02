import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { appRouter } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    appRouter
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [
  ]
})
export class AppModule { }
