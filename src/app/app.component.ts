import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './login/login.module';


@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
    </h1>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app works!';

  constructor () { }
}
