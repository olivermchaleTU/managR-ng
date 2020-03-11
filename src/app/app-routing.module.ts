import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: 'board',
    pathMatch: 'full',
    component: BoardComponent
  },
  {
    path: 'profile/:id',
    pathMatch: 'full',
    component: UserProfileComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
