import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LoginUser } from '../models/loginUser';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

  private baseUrl = 'http://localhost:8082/chat';
  private userAuthority: AuthenticatedUser;
  private userAuthenticationSubj = new Subject<AuthenticatedUser>();
  userAuthenticationObs = this.userAuthenticationSubj.asObservable();

  constructor(private http: Http, private router: Router ) {

    this.userAuthority = null;
    this.userAuthenticationSubj.next(null);
  }

  login(user: LoginUser): Promise<String> {
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.baseUrl + '/loginCheck', 'username=' + user.getUsername() + '&password=' + user.getPassword(), options)
      .toPromise().
      then(() => this.checkAuthority()).
      catch(this.handleError);
  }

  logout():void {
    
    this.http.post(this.baseUrl+'/logout',{},{withCredentials:true}).toPromise().then(()=>{this.checkAuthority(); this.router.navigate(["/"])}).catch(this.handleError);

  }

  checkAuthority():  void {
    
    this.http.get(this.baseUrl + '/user/authority', { withCredentials: true }).toPromise().then(response => {this.userAuthenticationSubj
    .next(response.json() as AuthenticatedUser); this.userAuthority = (response.json() as AuthenticatedUser)}).catch(error => this.handleAuthenticationError(error))
  }

  getAuthority() : AuthenticatedUser {
    return this.userAuthority;
  }

  private handleError(error: any): Promise<String> {
    
    return Promise.reject(error.status);
  }

  private handleAuthenticationError(error: any): void  {
  
    this.userAuthenticationSubj.next(null);
    if(error.status !== 401){
      console.log('Unexpected error: ' + error);
    }
  }
}
