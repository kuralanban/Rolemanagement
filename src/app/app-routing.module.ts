import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Empty path
    redirectTo: 'home', // Redirect to the 'home' module's path
    pathMatch: 'full', // Ensure a full match for the empty path
  },
  {
    path: 'home',
    loadChildren: () => import('../components/home/home.module').then((a) => a.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../components/auth/auth.module').then((a) => a.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
