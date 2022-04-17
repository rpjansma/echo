import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { EconomicsService } from 'src/app/core/services/economics-service/economics.service';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService } from '../../../core/services/event-service/event.service';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  dateForm: FormGroup;
  eventForm: FormGroup;
  apiEvents: any[] = [];
  userEvents: any[] = [];
  valuesToInputInChartData = [];
  eventsDatesToChart: any[] = [];
  events: any[] = [];
  apis: any[] = [
    { id: 'cdi', name: 'CDI' },
    { id: 'pib', name: 'PIB' },
    { id: 'ptax', name: 'Dólar' },
    { id: 'ipca', name: 'IPCA' },
    { id: 'ibovespa', name: 'Ibovespa' },
  ];

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public chartLabels = [];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [];

  id = this.userService.getUserId();
  event$ = this.eventService.getUserEvents(this.id);

  constructor(
    private economicsService: EconomicsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.dateForm = this.formBuilder.group({
      dataInicial: [null, [Validators.required]],
      dataFinal: [null, [Validators.required]],
    });
    this.eventForm = this.formBuilder.group({
      apiService: ['ptax'],
    });
  }

  ngOnInit(): void {
    this.process();
    this.fetchEventList();
  }

  process() {
    this.selectApiDataSource(this.eventForm.get('apiService').value);

    this.chart.chart.update();
  }

  selectApiDataSource(api: string) {
    switch (api) {
      case 'ipca':
        this.getIpcaData();
        break;
      case 'ptax':
        this.getDolarData();
        break;
      case 'ibovespa':
        this.getIbovespaData();
        break;
      case 'pib':
        this.getPibData();
        break;
      case 'cdi':
        this.getCdiData();
    }
  }

  getIpcaData() {
    this.valuesToInputInChartData = [];
    this.eventsDatesToChart = [];
    this.chartData = [];

    this.economicsService.getIpcaData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.eventsDatesToChart = this.apiEvents.map((value) =>
        this.parseDateFormat(value.data)
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Ipca',
        borderColor: 'rgb(6A,82,FB)',
        backgroundColor: 'rgb(6A,82,FB)',
      });
      this.chartLabels = this.eventsDatesToChart;
      this.chart.chart.update();
    });

    const id = this.userService.getUserId();

    /*this.eventService.getUserEvents(id).subscribe((data: any) => {
      this.userEvents = data;
      this.chartData.push({
        data: this.userEvents.map((value) => value.title),
        label: 'Eventos Usuário',
        borderColor: 'rgb(13,8A,BB)',
        backgroundColor: 'rgb(13,8A,BB)',
      });
      this.eventsDatesToChart = this.userEvents.map((value) =>
        moment(value.start).format('D MMM YY')
      );
      this.eventsDatesToChart.push(
        this.userEvents.map((value) => moment(value.end).format('D MMM YY'))
      );
      this.chartLabels = this.eventsDatesToChart;
      this.chart.chart.update();
    });*/
  }

  getDolarData() {
    this.valuesToInputInChartData = [];
    this.eventsDatesToChart = [];
    this.chartData = [];

    this.economicsService.getPtaxData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.cotacaoVenda
      );
      this.eventsDatesToChart = this.apiEvents.map((value) =>
        this.parseDateFormat(value.data)
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Dolar (Venda)',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
      console.log(this.eventsDatesToChart)
      this.chart.chart.update();
    });
    console.log(this.valuesToInputInChartData);
  }

  getIbovespaData() {
    this.valuesToInputInChartData = [];
    this.eventsDatesToChart = [];
    this.chartData = [];

    this.economicsService.getIbovespaData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.eventsDatesToChart = this.apiEvents.map((value) =>
        this.parseDateFormat(value.data)
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Ibovespa',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
      this.chart.chart.update();
    });
  }

  getPibData() {
    this.valuesToInputInChartData = [];
    this.eventsDatesToChart = [];
    this.chartData = [];

    this.economicsService.getPibData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.eventsDatesToChart = this.apiEvents.map((value) =>
        this.parseDateFormat(value.data)
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'PIB',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
      this.chart.chart.update();
    });
  }

  getCdiData() {
    this.valuesToInputInChartData = [];
    this.eventsDatesToChart = [];
    this.chartData = [];

    this.economicsService.getCdiData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.eventsDatesToChart = this.apiEvents.map((value) =>
        this.parseDateFormat(value.data)
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'CDI',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
      this.chart.chart.update();
    });
  }

  updateApiDate() {
    const dataInicial = this.dateForm.get('dataInicial')?.value;
    const dataFinal = this.dateForm.get('dataFinal')?.value;
    if (dataInicial > dataFinal) {
      alert('A data inicial deve ser maior que a data final!');
    } else {
      this.economicsService.changeInitialDate(dataInicial);
      this.economicsService.changeFinalDate(dataFinal);
      this.process();
    }
  }

  fetchEventList(): void {
    const id = this.userService.getUserId();
    this.events = [];
    this.eventService.getUserEvents(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end),
        });
      }
      this.refresh.next(this.events);
    });
  }

  parseDateFormat(date) {
    return moment(date).format('D MMM YY');
  }
}
