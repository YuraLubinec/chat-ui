import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticatedUser } from './models/authenticatedUser';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private userAuthority: AuthenticatedUser;
  private subscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.subscription = this.authenticationService.userAuthenticationObs.subscribe(userAuthority => this.userAuthority = userAuthority);
    this.authenticationService.checkAuthority();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
