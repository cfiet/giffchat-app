import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { GoogleComponent } from './google.component';

const routes: Routes = [
  { path: 'login/google', component: GoogleComponent },
  { path: 'login', component: LoginComponent }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(routes);