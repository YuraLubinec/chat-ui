import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { StatisticService } from "app/services/statistic.service";
import { CommonStatistic } from "app/models/commonStatistic";

@Component({
  selector: 'commonCustomers',
  templateUrl: './statistic_common_customers.component.html',
  styleUrls: ['./statistic_common_customers.component.css'],
  providers: [StatisticService]
})
export class StatisticCommonCustomersComponent implements OnInit {
private noSearchParametersNotification: boolean;
    private datePickerFromOpts;
    private datePickerToOpts;
    private emptyhResult: boolean;
    private notEmptyhResult: boolean;
    private customerName;
    private dateStart: Date;
    private dateEnd: Date;
    private statisticDateStart = '';
    private statisticDateEnd = '';
    private operatorStatistic: Array<CommonStatistic>;
    public barChartLabels:string[];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
    public barChartData:any[];

  constructor(private statisticService: StatisticService) {
      this.datePickerFromOpts = {
      autoclose: true,
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      language: "uk",
      placeholder: 'Виберіть дату початку'
    }
    this.datePickerToOpts = {
      autoclose: true,
      format: 'yyyy-mm-dd',
      todayHighlight: true,
      language: "uk",
      placeholder: 'Виберіть кінцеву дату'
    }

    this.barChartLabels = [''];
    this.barChartData = [
      {data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      {data: [], label: 'Оброблені'},
      {data: [], label: 'Середінй час утримання'},
      {data: [], label: 'Середнє число рейтингу'}
    ];
   }

  ngOnInit() {}

  onSubmit(){
    let dateStart = null;
    let dateEnd = null;

    if(this.dateStart == undefined || this.dateEnd == undefined){
      this.noSearchParametersNotification = true;
      this.statisticDateStart = '';
       this.statisticDateEnd = '';
      this.barChartLabels = [''];
      this.barChartData = [
      {data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      {data: [], label: 'Оброблені'},
      {data: [], label: 'Середінй час утримання'},
      {data: [], label: 'Середнє число рейтингу'}
    ];
  } else {
        this.noSearchParametersNotification = false;
        dateStart = this.dateStart.getFullYear() + '-' + ('0' + (this.dateStart.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateStart.getDate()).slice(-2);
        dateEnd = this.dateEnd.getFullYear() + '-' + ('0' + (this.dateEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateEnd.getDate()).slice(-2);
        
        this.statisticDateStart = dateStart;
        this.statisticDateEnd = dateEnd;

          if(this.customerName === undefined || this.customerName ==''){
              this.barChartLabels = [];
              this.statisticService.getCustomerListStatistic(dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
          }else{
              this.barChartLabels = [this.customerName];
              this.statisticService.getCustomerStatistic(this.customerName,dateStart, dateEnd).subscribe(data => this.dataHandlerCustomer(data), this.searchErrorHandler);
          }  
    }
  }

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  private dataHandler(staticData: Response) {
    this.operatorStatistic = staticData.json()  as Array<CommonStatistic>;

    console.log(this.operatorStatistic.length);
    if(this.operatorStatistic.length == 0){
      this.emptyhResult = true;
    }

    let barChartDataResponse = [
      {data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      {data: [], label: 'Оброблені'},
      {data: [], label: 'Середінй час утримання'},
      {data: [], label: 'Середнє число рейтингу'}
    ];

      for(let i = 0; i < this.operatorStatistic.length; i++){       
        this.barChartLabels[i] = staticData.json()[i]._id;

        barChartDataResponse[0].data[i] = staticData.json()[i].countLost;

        barChartDataResponse[1].data[i] = staticData.json()[i].countAll;

        barChartDataResponse[2].data[i] = staticData.json()[i].countHandled;

        barChartDataResponse[3].data[i] = staticData.json()[i].averageHoldTime;
        
        barChartDataResponse[4].data[i] = staticData.json()[i].averageRate;
      }

    this.barChartData = barChartDataResponse;
  }

   private dataHandlerCustomer(staticData: Response) {

    if(!staticData['_body']){

      this.emptyhResult = true;
      this.notEmptyhResult = false;

      this.barChartData = [
            {data: [], label: 'Пропущені'},
            {data: [], label: 'Загальна кількість'},
            {data: [], label: 'Оброблені'},
            {data: [], label: 'Середінй час утримання'},
            {data: [], label: 'Середнє число рейтингу'}
    ];
  }else{
      this.emptyhResult = false;
      this.notEmptyhResult = true;
      this.barChartData = [
        {data: [staticData.json().countLost], label: 'Пропущені'},
        {data: [staticData.json().countAll], label: 'Загальна кількість'},
        {data: [staticData.json().countHandled], label: 'Оброблені'},
        {data: [staticData.json().averageHoldTime], label: 'Середінй час утримання'},
        {data: [staticData.json().averageRate], label: 'Середнє число рейтингу'}
      ];
    }
  }

  private searchErrorHandler(error: any) {
    console.log(error);
    alert("У ході пошуку виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }

}
