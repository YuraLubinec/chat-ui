import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StompService } from 'ng2-stomp-service';

import { RoutingModule } from "./routing/routing.module";
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    MenuComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, RoutingModule
  ],
  providers: [AuthenticationService, StompService],
  bootstrap: [AppComponent]
})
export class AppModule { }
