import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../models/authenticatedUser';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}
  

  canActivate() {

    if (sessionStorage.getItem('currentChatUserName') && sessionStorage.getItem('currentChatUserRole') === "ADMIN") {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}