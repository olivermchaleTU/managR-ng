import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AgileItemDetailsComponent } from './components/agile-item-details/agile-item-details.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { TopologyComponent } from './components/topology/topology.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
  {
    path: 'board',
    pathMatch: 'full',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
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
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: AgileItemDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics/:id',
    pathMatch: 'full',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'topology/:id',
    pathMatch: 'full',
    component: TopologyComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
