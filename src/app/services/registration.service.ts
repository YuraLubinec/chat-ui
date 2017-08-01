import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { User} from '../models/user';

@Injectable()
export class RegistrationService {

  private baseUrl = 'http://localhost:8082/chat/user';
  
  constructor(private http : Http){

  }

  registerNewUser(user: User): Promise<Response>{
    return this.http.post(this.baseUrl+'/registration', user, {withCredentials:true}).toPromise();
  }

  getAvailableRoles() {
    return this.http.get(this.baseUrl+'/roles', {withCredentials:true});
  }
}