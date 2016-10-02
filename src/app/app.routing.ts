import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(routes);