import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';

import { Component, OnInit } from '@angular/core';

import { DolarService } from '../../../core/services/dolar-service/dolar.service';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {

  events: any = [];

  constructor(private dolarService: DolarService) {
  }

  getTest() {
    return this.dolarService.getDolarData().subscribe((res) => {
       return console.log(res)
      },
      (error) => {
        console.log("Coxinha")
      }
    );
  }


  ngOnInit(): void {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dolar Rate',
          backgroundColor: 'rgb(6C, 6C, 6C)',
          borderColor: 'rgb(6C, 6C, 6C)',
          data: "potato",
        },
      ],
    };
    var canvas = <HTMLCanvasElement>document.getElementById('myChart');
    var ctx = canvas.getContext('2d');
    const config = {
      type: 'line' as ChartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as ChartType,
          },
          title: {
            display: true,
            text: 'Timeline',
          },
        },
      },
    };
    var myChart = new Chart(ctx, config as any);
  }
}
