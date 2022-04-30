import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EconomicsService } from '../../core/services/economics-service/economics.service';
import { EventService } from '../../core/services/event-service/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  loading: boolean = false;

  form: FormGroup;
  apiForm: FormGroup;
  eventForm: FormGroup;
  apis: any[] = [];
  locais: any[] = []

  events = [];

  id = this.userService.getUserId();
  event$ = this.eventService.getUserEvents(this.id);

  selected: string = 'Nacional';
  allLocals = ['Nacional', 'Internacional'];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  dateForm: FormGroup;
  graphicForm: FormGroup;
  localForm: FormGroup;
  apiEvents: any[] = [];
  userEvents: any[] = [];
  valuesToInputInChartData = [];
  eventsDatesToChart: any[] = [];

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public chartLabels = [];
  public chartType = 'line';
  public chartLegend = true;
  public chartData = [];

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private userService: UserService,
    private eventService: EventService,
    private economicsService: EconomicsService
  ) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      sector: ['', Validators.required],
      local: ['nacional'],
    });
    this.apiForm = this.formBuilder.group({});
    this.form = this.formBuilder.group({
      apiService: ['pib'],
    });
    this.dateForm = this.formBuilder.group({
      dataInicial: [null, [Validators.required]],
      dataFinal: [null, [Validators.required]],
    });
    this.graphicForm = this.formBuilder.group({
      apiService: ['ptax'],
    });

    this.localForm = this.formBuilder.group({
    });

  }

  ngOnInit() {
    this.apis = this.getApis();
    this.locais = this.getLocais();
    console.log(this.localForm.get('local')?.value)
    this.fetchEventList();
    this.process();
  }

  fetchEventList(): void {
    const userId = this.userService.getUserId();
    this.events = [];
    this.eventService.getUserEvents(userId).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          _id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end),
          sector: res[i].sector,
          local: res[i].local,
        });
      }
      this.refresh.next(this.events);
    });
  }

  newEvent() {
    const user = this.userService.getUserId();
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;
    const sector = this.eventForm.get('sector')?.value;
    const local = this.eventForm.get('local')?.value;
    console.log(this.eventForm.get('local')?.value)

    this.createEvent(user, title, start, end, sector, local);
    this.eventForm.reset();
  }

  editEvent() {
    const id: any = '';
    const title = this.eventForm.get('title')?.value;
    const start = this.eventForm.get('start')?.value;
    const end = this.eventForm.get('end')?.value;
    const sector = this.eventForm.get('sector')?.value;
    const local = this.eventForm.get('local')?.value;

    this.updateEvent(id, title, start, end, sector, local);
    this.eventForm.reset();
  }

  createEvent(user, title, start, end, sector, local) {
    this.loading = true;
    this.eventService
      .createEvent(user, title, start, end, sector, local)
      .subscribe(
        () => {
          this.loading = false;
          this.fetchEventList();
          this.modal.dismissAll();
        },
        () => {}
      );
    return;
  }

  updateEvent(id, title, start, end, sector, local) {
    this.loading = true;
    this.eventService
      .updateEvent(id, title, start, end, sector, local)
      .subscribe(() => {
        this.loading = false;
        this.fetchEventList();

        this.modal.dismissAll();
      });
    return;
  }

  deleteEvent(id, content): void {
    this.loading = true;
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.fetchEventList();
        this.loading = false;
      },
      () => {}
    );
    this.refresh.next(this.event$);
    this.modal.open(content);
  }

  getEventById(eventId: string) {
    const userId = this.userService.getUserId();

    this.loading = true;
    this.eventService.getEventById(eventId, userId).subscribe(() => {
      this.loading = false;
    });
    return;
  }

  isRequiredAndTouched(control: string) {
    return (
      !this.eventForm.get(control).valid && this.eventForm.get(control).touched
    );
  }

  getApis() {
    return [
      { id: 'cdi', name: 'CDI' },
      { id: 'pib', name: 'PIB' },
      { id: 'ptax', name: 'Dólar' },
      { id: 'ipca', name: 'IPCA' },
      { id: 'ibovespa', name: 'Ibovespa' },
    ];
  }

  getLocais() {
    return [
      { id: 'nacional', name: 'NACIONAL' },
      { id: 'internacional', name: 'INTERNACIONAL' },
    ];
  }

  openModal(modal) {
    this.modal.open(modal);
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
    this.chartData = [];
    this.eventsDatesToChart = [];

    this.economicsService.getIpcaData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.apiEvents.map((value) =>
        this.eventsDatesToChart.push(this.parseDateFormat(value.data))
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Ipca',
        borderColor: 'rgb(6A,82,FB)',
        backgroundColor: 'rgb(6A,82,FB)',
      });
    });
    this.chartLabels = this.eventsDatesToChart;
    this.chart.chart.update();
  }

  getDolarData() {
    this.valuesToInputInChartData = [];
    this.chartData = [];
    this.eventsDatesToChart = [];

    this.economicsService.getPtaxData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.cotacaoVenda
      );
      this.apiEvents.map((value) =>
        this.eventsDatesToChart.push(
          this.parseDateFormat(value.dataHoraCotacao)
        )
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Dolar (Venda)',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
    });
    this.chart.chart.update();
  }

  getIbovespaData() {
    this.valuesToInputInChartData = [];
    this.chartData = [];
    this.eventsDatesToChart = [];

    this.economicsService.getIbovespaData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.apiEvents.map((value) =>
        this.eventsDatesToChart.push(this.parseDateFormat(value.data))
      );
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'Ibovespa',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      this.chartLabels = this.eventsDatesToChart;
    });
    this.chart.chart.update();
  }

  getPibData() {
    this.valuesToInputInChartData = [];
    this.chartData = [];
    this.eventsDatesToChart = [];

    this.economicsService.getPibData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.apiEvents.map((value) => this.eventsDatesToChart.push(value.data));
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'PIB',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
    });
    this.chartLabels = this.eventsDatesToChart;
    this.chart.chart.update();
  }

  getCdiData() {
    this.valuesToInputInChartData = [];
    this.chartData = [];
    this.eventsDatesToChart = [];

    this.economicsService.getCdiData().subscribe((data: any) => {
      this.apiEvents = data;
      this.valuesToInputInChartData = this.apiEvents.map(
        (value) => value.valor
      );
      this.apiEvents.map((value) => this.eventsDatesToChart.push(value.data));
      this.chartData.push({
        data: this.valuesToInputInChartData,
        label: 'CDI',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
      console.log(this.eventsDatesToChart);
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
      this.economicsService.changeInitialDate(
        this.parseDateFormat(dataInicial)
      );
      this.economicsService.changeFinalDate(this.parseDateFormat(dataFinal));
      this.process();
    }
  }

  updateApiDateFromEvent(dataInicial, dataFinal, id) {
    this.economicsService.changeInitialDate(this.parseDateFormat(dataInicial));
    this.economicsService.changeFinalDate(this.parseDateFormat(dataFinal));
    this.getEventById(id);
    this.process();
  }

  process() {
    this.selectApiDataSource(this.graphicForm.get('apiService').value);
    this.fetchEventList();
  }

  parseDateFormat(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  allDatesBetweenTwoDates(startDate: Date, endDate: Date) {
    const dates = [];
    let currentDate = startDate;

    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    this.eventsDatesToChart = [];
    this.eventsDatesToChart = dates;

    this.chartLabels = this.eventsDatesToChart;
  }
}
