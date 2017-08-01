import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {
  private baseUrl = 'http://localhost:8082/chat/admin';

  constructor(private http: Http) {

  }

  getAllOperatorDialogs(operator: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/operator/" + operator, { withCredentials: true });
  }

  getAllCustomerDialogs(customer_id: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/customer/" + customer_id, { withCredentials: true });
  }

  getAllOperatorDialogsForDate(operator: string, date: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/operator/" + operator + "/" + date, { withCredentials: true });
  }

  getAllCustomerDialogsForDate(customer_id: string, date: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/customer/" + customer_id + "/" + date, { withCredentials: true });
  }

}
