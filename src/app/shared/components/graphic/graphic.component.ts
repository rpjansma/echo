import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  constructor() {}

  getTest() {}

  ngOnInit(): void {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
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
            text: 'Chart.js Line Chart',
          },
        },
      },
    };
    var myChart = new Chart(ctx, config as any);
  }
}
