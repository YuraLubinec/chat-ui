import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LoginUser } from '../models/loginUser';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {

  private baseUrl = 'http://localhost:8082/chat';

  constructor(private http: Http, private router: Router) { }

  login(user: LoginUser): Promise<void> {

    let headers = user ? new Headers({ authorization: "Basic " + btoa(user.getUsername() + ":" + user.getPassword()) }) : new Headers({});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.baseUrl + '/user/authority', options)
      .toPromise().
      then(response => {
        let user = response.json() as AuthenticatedUser;
        this.saveCurrentUsetToSessionStorage(user);
        this.router.navigate(["/main/home"]);
      }).
      catch(this.handleError);
  }

  logout(): void {

    this.removeCurrentUserFromSessionStorage();
    this.http.post(this.baseUrl + '/logout', {}, { withCredentials: true }).toPromise().then(() => {
      this.router.navigate(["/login"])
    }).catch(this.handleError);
  }

  checkAuthority(): Promise<void> {

    return this.http.get(this.baseUrl + '/user/authority', { withCredentials: true })
      .toPromise().catch(error => this.handleAuthenticationError(error));
  }

  private saveCurrentUsetToSessionStorage(user: AuthenticatedUser) {

    sessionStorage.setItem('currentChatUserName', user.username);
    sessionStorage.setItem('currentChatUserRole', user.role);
  }

  private removeCurrentUserFromSessionStorage() {

    sessionStorage.removeItem('currentChatUserName');
    sessionStorage.removeItem('currentChatUserRole');
  }

  private handleError(error: any): void {

    if (error.status !== 401) {
      alert('Unexpected authentication error: ' + error);
    }
  }

  private handleAuthenticationError(error: any): void {

    this.removeCurrentUserFromSessionStorage();
    this.router.navigate(["/login"]);
    if (error.status !== 401) {
      alert('Unexpected authentication error: ' + error);
    }
  }
}
