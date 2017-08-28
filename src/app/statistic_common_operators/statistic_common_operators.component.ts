import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { StatisticService } from "app/services/statistic.service";
import { CommonStatistic } from "app/models/commonStatistic";

@Component({
  selector: 'commonOperators',
  templateUrl: './statistic_common_operators.component.html',
  styleUrls: ['./statistic_common_operators.component.css'],
  providers: [StatisticService]
})
export class StatisticCommonOperatorsComponent implements OnInit {
    noSearchParametersNotification: boolean;
    operatorName = '';
    datePickerFromOpts;
    datePickerToOpts;
    dateStart: Date;
    dateEnd: Date;
    emptyhResult: boolean;
    statisticDateStart = '';
    statisticDateEnd = '';
    operatorStatistic: Array<CommonStatistic>;
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
     // {data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      //{data: [], label: 'Оброблені'},
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
      //{data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      //{data: [], label: 'Оброблені'},
      {data: [], label: 'Середінй час утримання'},
      {data: [], label: 'Середнє число рейтингу'}
    ];
  } else {
        this.noSearchParametersNotification = false;
        dateStart = this.dateStart.getFullYear() + '-' + ('0' + (this.dateStart.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateStart.getDate()).slice(-2);
        dateEnd = this.dateEnd.getFullYear() + '-' + ('0' + (this.dateEnd.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateEnd.getDate()).slice(-2);
        
        this.statisticDateStart = dateStart;
        this.statisticDateEnd = dateEnd;

        if(this.operatorName == ''){
            this.statisticService.getOperatorListStatistic(dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
        }else {
          this.barChartLabels = [this.operatorName];
          this.statisticService.getOperatorStatistic(this.operatorName, dateStart, dateEnd).subscribe(data => this.dataHandlerOperator(data), this.searchErrorHandler);
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
    if(this.operatorStatistic.length == 0){
      this.emptyhResult = true;
    }else{
      this.emptyhResult = false;
    }
    
    let barChartDataResponse = [
     // {data: [], label: 'Пропущені'},
      {data: [], label: 'Загальна кількість'},
      //{data: [], label: 'Оброблені'},
      {data: [], label: 'Середінй час утримання'},
      {data: [], label: 'Середнє число рейтингу'}
    ];

      for(let i = 0; i < this.operatorStatistic.length; i++){       
        this.barChartLabels[i] = staticData.json()[i]._id;

        //barChartDataResponse[0].data[i] = staticData.json()[i].countLost;

        barChartDataResponse[0].data[i] = staticData.json()[i].countAll;

        //barChartDataResponse[2].data[i] = staticData.json()[i].countHandled;

        barChartDataResponse[1].data[i] = staticData.json()[i].averageHoldTime;
        
        barChartDataResponse[2].data[i] = staticData.json()[i].averageRate;
      }

    this.barChartData = barChartDataResponse;
  }

    private dataHandlerOperator(staticData: Response) {

       if(!staticData['_body']){
         this.emptyhResult = true;
      this.barChartData = [
            //{data: [], label: 'Пропущені'},
            {data: [], label: 'Загальна кількість'},
           // {data: [], label: 'Оброблені'},
            {data: [], label: 'Середінй час утримання'},
            {data: [], label: 'Середнє число рейтингу'}
    ];
  }else{
      this.emptyhResult = false;
      this.barChartData = [
       // {data: [staticData.json().countLost], label: 'Пропущені'},
        {data: [staticData.json().countAll], label: 'Загальна кількість'},
       // {data: [staticData.json().countHandled], label: 'Оброблені'},
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
