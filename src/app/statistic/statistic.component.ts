import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { StatisticService } from "app/services/statistic.service";

@Component({
  selector: 'commonApeals',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  providers: [StatisticService]
})
export class StatisticComponent implements OnInit {
    private noSearchParametersNotification: boolean;
    private emptyhResult: boolean;
    private notEmptyhResult: boolean;
    private datePickerFromOpts;
    private datePickerToOpts;
    private dateStart: Date;
    private dateEnd: Date;
    private statisticDateStart = '';
    private statisticDateEnd = '';
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

        this.barChartLabels = [this.statisticDateStart + ' - ' + this.statisticDateEnd];
        this.statisticService.getCommonStatisticByAllOparators(dateStart, dateEnd).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
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
