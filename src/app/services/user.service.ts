import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user";

@Injectable()
export class UserService {
  private baseUrl: string;

  constructor(private http : Http) {
    this.baseUrl='http://localhost:8082/chat/user/';
  }

  getUserDeatails() : Observable<Response>{
    return this.http.get(this.baseUrl+sessionStorage.getItem("currentChatUserName"), {withCredentials: true});
  }

  getAllUsers() :Observable<Response> {
    return this.http.get(this.baseUrl, {withCredentials:true})
  }

  updateUser(user : User) {
    this.http.put(this.baseUrl, user, {withCredentials:true}).toPromise().catch(this.handleHttpError);
  }

  deleteUser(id : string) {
    this.http.delete(this.baseUrl+id, {withCredentials:true}).toPromise().catch(this.handleHttpError);
  }

  handleHttpError(error : any){
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора");
  }


}
