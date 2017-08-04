import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DialogService {
  private baseUrl = 'http://localhost:8082/chat/admin/dialog';

  constructor(private http: Http) {

  }

  getAllOperatorDialogs(operator: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/operator/" + operator, { withCredentials: true });
  }

  getAllCustomerDialogs(customer_id: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/customer/" + customer_id, { withCredentials: true });
  }

  getAllOperatorDialogsForDate(operator: string, dateStart: string, dateEnd: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/operator/" + operator + "/" + dateStart + "/" + dateEnd, { withCredentials: true });
  }

  getAllCustomerDialogsForDate(customer_id: string, dateStart: string, dateEnd: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/customer/" + customer_id + "/" + dateStart + "/" + dateEnd, { withCredentials: true });
  }

  getAllForDate(dateStart: string, dateEnd: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/date/" + dateStart + "/" + dateEnd, { withCredentials: true });
  }

  getAllCustomerAndOperatorDialogsForDate(customer_id: string, operator: string, dateStart: string, dateEnd: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/" + customer_id + "/" + operator + "/" + dateStart + "/" + dateEnd, { withCredentials: true });
  }

  getAllCustomerAndOperatorDialogs(customer_id: string, operator: string): Observable<Response> {
    return this.http.get(this.baseUrl + "/" + customer_id + "/" + operator, { withCredentials: true });
  }

  getAllDialogsWithTextInMessage(text: string): Observable<Response> {
    let urlParams = new URLSearchParams();
    urlParams.append('text', text);
    console.log(text);
    return this.http.get(this.baseUrl + "/text", { withCredentials: true, params: urlParams });
  }


}
