import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StompService } from 'ng2-stomp-service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { RoutingModule } from "./routing/routing.module";
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from "./services/user.service";
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { DialogComponent } from './dialog/dialog.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    StatisticComponent,
    MainComponent,
    RegistrationComponent,
    DialogComponent,
    UserComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, RoutingModule, NKDatetimeModule
  ],
  providers: [AuthenticationService, StompService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
