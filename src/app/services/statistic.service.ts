import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatisticService {
  private baseUrl = 'http://localhost:8082/chat/admin/statistic';

  constructor(private http: Http) {

  }
    getCommonStatisticByAllOparators(dateStart: string, dateEnd:string): Observable<Response> {
        return this.http.get(this.baseUrl + "/all/" + dateStart +"_"+ dateEnd, { withCredentials: true });
    }

    getOperatorStatistic(operatorId:string, dateBeg:string, dateEnd:string): Observable<Response> {
        return this.http.get(this.baseUrl + "/operator/" + operatorId + "/" + dateBeg + "/" + dateEnd, { withCredentials: true });
    }

    getOperatorListStatistic(dateBeg:string, dateEnd:string): Observable<Response> {
        return this.http.get(this.baseUrl + "/operator/operators_stat/" + dateBeg + "_" + dateEnd, { withCredentials: true });
    }

    getCustomerStatistic(customerId:string, dateBeg:string, dateEnd:string): Observable<Response>{
        return this.http.get(this.baseUrl + "/customer/" + customerId + "/" + dateBeg + "_" + dateEnd, { withCredentials: true });
    }

    getCustomerListStatistic(dateBeg:string, dateEnd:string): Observable<Response>{
        return this.http.get(this.baseUrl + "/customer/customers_stat/" + dateBeg + "_" + dateEnd, { withCredentials: true });
    }
}