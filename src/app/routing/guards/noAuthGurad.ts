import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticatedUser } from '../../models/authenticatedUser';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) {}
  

  canActivate() {
   
    if (!sessionStorage.getItem('currentChatUserName')) {
      
      return true;
    }
    this.router.navigate(['/main/home']);
    return false;
  }

}