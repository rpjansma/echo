import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'echo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public chartLabels = [
    '12/nov',
    '13/nov',
    '14/nov',
    '15/nov',
    '16/nov',
    '17/nov',
  ];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [
    {
      label: 'Dólar',
      type: 'line',
      borderColor: '#8e5ea2',
      data: [5.1626, 5.3269, 5.3182, 5.3433, 5.3269, 5.3182],
      fill: false,
    },
    {
      label: 'Greve dos Caminhoneiros',
      type: 'line',
      borderColor: '#3e95cd',
      data: [, 5.2, 5.2, 5.2],
      labels: ['13/nov, 15/nov'],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
