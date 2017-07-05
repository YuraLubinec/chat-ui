import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../models/authenticatedUser';

@Injectable()
export class OperatorAuthGuard implements CanActivate {

  private userAuthority: AuthenticatedUser;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userAuthority = this.authenticationService.getAuthority();
    this.authenticationService.userAuthenticationObs
    .subscribe(userAuthority =>this.userAuthority = userAuthority);
  }

  canActivate() {
  
    if (this.userAuthority != null && this.userAuthority.role === "operator") {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}