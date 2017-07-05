import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';
import { StatisticComponent } from '../statistic/statistic.component';
import { AdminAuthGuard } from './guards/adminAuthGuard';
import { OperatorAuthGuard } from './guards/operatorAuthGuard';
import { AppModule } from "../app.module";
import { AuthenticationService } from '../services/authentication.service';

const appRoutes: Routes = [
  { path: "chat", component: ChatComponent, canActivate: [OperatorAuthGuard] },
  { path: "statistic", component: StatisticComponent, canActivate: [AdminAuthGuard] },
  { path: "home", component: HomeComponent },
  { path: "**", component: HomeComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [AdminAuthGuard, OperatorAuthGuard, AuthenticationService]
})
export class RoutingModule { }
