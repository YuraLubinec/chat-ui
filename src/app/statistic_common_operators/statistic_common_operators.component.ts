import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { StatisticService } from "app/services/statistic.service";
import { CommonStatistic } from "app/models/commonStatistic";

@Component({
  selector: 'commonApeals',
  templateUrl: './statistic_common_operators.component.html',
  styleUrls: ['./statistic_common_operators.component.css'],
  providers: [StatisticService]
})
export class StatisticCommonOperatorsComponent implements OnInit {
    private noSearchParametersNotification: boolean;
    private datePickerFromOpts;
    private datePickerToOpts;
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

        this.statisticService.getOperatorListStatistic(dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
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
    console.log(staticData);
    console.log(staticData.json());

    this.operatorStatistic = staticData.json()  as Array<CommonStatistic>;

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

  private searchErrorHandler(error: any) {
    console.log(error);
    alert("У ході пошуку виникла помилка, спробуйте пізніше або зверніться до адміністратора");
  }
}
