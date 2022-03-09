import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartPoint, ChartType, scaleService } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [
      {x:1,y:1},
      {x:2,y:2},
      {x:3,y:0}
    ], label: 'Series A' },
  ];
  @Input() lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  @Input() lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'linear',
        ticks: {}
      }],
      yAxes: [{
        type: 'linear',
        ticks: {}
      }]
    },
    tooltips: {
      enabled: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    aspectRatio: 1
  };
  @Input() lineChartColors: Color[] = [
    // {
    //   borderColor: 'black',
    //   backgroundColor: 'rgba(255,0,0,1)',
    // },
    // {
    //   borderColor: 'black',
    //   backgroundColor: 'rgba(255,0,0,1)',
    // },
    // {
    //   borderColor: 'black',
    //   backgroundColor: 'rgba(255,0,0,1)',
    // },
    // {
    //   borderColor: 'black',
    //   backgroundColor: 'rgba(255,0,0,1)',
    // },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];


  makeSquare(chart_data: ChartDataSets[]) {
    // Make the length of the x and y-axis equal
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;

    chart_data.forEach((data_series) => {
      for (let index = 0; index < data_series.data!.length; index++) {
        const element:any = data_series.data![index];
        if (element.x > xMax){
          xMax = element.x;
        }
        else if (element.x < xMin){
          xMin = element.x;
        }
        if (element.y > yMax){
          yMax = element.y;
        }
        else if (element.y < yMin){
          yMin = element.y;
        }
      }

    });

    const xLength = xMax - xMin;
    const yLength = yMax - yMin;
    if (xLength > yLength) {
      const difference = xLength - yLength;
      yMax = yMax + difference / 2;
      yMin = yMin - difference / 2;
    } else {
      const difference = yLength - xLength;
      xMax = xMax + difference / 2;
      xMin = xMin - difference / 2;
    }

    console.log(xMin,xMax)
    // Set the new min and max on the chart instance
    this.lineChartOptions.scales!.xAxes! =  [{
      type: 'linear',
      ticks: {min:xMin, max:xMax}
    }]; 

    this.lineChartOptions.scales!.yAxes! =  [{
      type: 'linear',
      ticks: {min:yMin, max:yMax}
    }];

  }

  constructor() { }

  ngOnInit() {
    console.log('Chart init');
    // this.makeSquare(this.lineChartData);
  }




}
