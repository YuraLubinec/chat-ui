import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticService {
  private baseUrl = 'http://localhost:8082/chat/admin/statistic';

  constructor(private http: Http) {

  }
    getCommonStatisticByAllOparators(dateStart: string, dateEnd:string): Observable<Response> {
        console.log("Service statistic all operator")
        return this.http.get(this.baseUrl + "/all/" + dateStart +"_"+ dateEnd, { withCredentials: true });
    }
}