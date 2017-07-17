import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../models/authenticatedUser';

@Injectable()
export class OperatorAuthGuard implements CanActivate {

  private userAuthority: AuthenticatedUser;

  constructor(private router: Router) {  }

  canActivate() {

    if (sessionStorage.getItem('currentChatUserName') && sessionStorage.getItem('currentChatUserRole') === "OPERATOR") {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}