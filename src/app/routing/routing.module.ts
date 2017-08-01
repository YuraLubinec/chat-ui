import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';
import { MainComponent } from '../main/main.component';
import { DialogComponent } from '../dialog/dialog.component'
import { StatisticComponent } from '../statistic/statistic.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AdminAuthGuard } from './guards/adminAuthGuard';
import { OperatorAuthGuard } from './guards/operatorAuthGuard';
import { NoAuthGuard } from './guards/noAuthGurad';
import { AuthGuard } from './guards/authGuard';
import { AppModule } from "../app.module";
import { AuthenticationService } from '../services/authentication.service';

const appRoutes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: "main", component: MainComponent, canActivate: [AuthGuard], children: [
      { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
      { path: "chat", component: ChatComponent, canActivate: [OperatorAuthGuard] },
      { path: "statistic", component: StatisticComponent, canActivate: [AdminAuthGuard] },
      { path: "registration", component: RegistrationComponent, canActivate: [AdminAuthGuard] },
      { path: "dialog", component: DialogComponent, canActivate: [AdminAuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
    ]
  },

  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: "**", redirectTo: '/main', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AdminAuthGuard, OperatorAuthGuard, AuthGuard, NoAuthGuard, AuthenticationService]
})
export class RoutingModule { }
