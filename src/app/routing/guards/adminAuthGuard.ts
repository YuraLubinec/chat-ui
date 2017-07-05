import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../models/authenticatedUser';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  private userAuthority: AuthenticatedUser;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userAuthority = this.authenticationService.getAuthority();
    this.authenticationService.userAuthenticationObs
    .subscribe(userAuthority =>this.userAuthority = userAuthority);
  }

  canActivate() {
   
    if (this.userAuthority != null && this.userAuthority.role === "admin") {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}