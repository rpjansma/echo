import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { GraphicComponent } from './shared/components/graphic/graphic.component';
import { TestComponetComponent } from './shared/components/teste/teste.component';

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
    path: 'test',
    component: TestComponetComponent,

  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
