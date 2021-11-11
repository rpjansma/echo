import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { GraphicComponent } from './shared/components/graphic/graphic.component';
import { EventsComponent } from './pages/events/events.component';
import { HistoricComponent } from './pages/historic/historic.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)
  },

  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then(module => module.LoginModule)
  },

  {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/register/register.module').then(module => module.RegisterModule)
  },

  {
    path: 'graphic',
    component: GraphicComponent,
  },

  {
    path: 'eventos',
    loadChildren: () => import('./pages/events/events.module').then(module => module.EventsModule)
  },

  {
    path: 'historico',
    loadChildren: () => import('./pages/historic/historic.module').then(module => module.HistoricModule)
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }