import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DolarService } from '../../../core/services/dolar-service/dolar.service';
import { EventService } from '../../../core/services/event-service/event.service';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  dolarEvents: any[] = [];
  userEvents: any[] = [];
  dateForm: FormGroup;
  cotacaoVenda = [];
  dataCotacao: any[] = [];
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
    private dolarService: DolarService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.dateForm = this.formBuilder.group({
      dataInicial: ['01-01-2020', [Validators.required]],
      dataFinal: ['11-22-2020', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchEventList();
    this.chart.chart.update();
  }

  getData() {
    return this.dolarService.getDolarData().subscribe((data: any) => {
      this.cotacaoVenda = [];
      this.dataCotacao = [];
      this.chartData = [];
      this.dolarEvents = data.value;
      this.cotacaoVenda = this.dolarEvents.map((value) => value.cotacaoVenda);
      this.dataCotacao = this.dolarEvents.map((value) =>
        moment(value.dataHoraCotacao).format('D MMM YY')
      );
      this.chartData.push(
        {
          data: this.cotacaoVenda,
          label: 'Valor de Venda',
          borderColor: 'rgb(6C, 6C, 6C)',
          backgroundColor: 'rgb(6C, 6C, 6C)',
        },
        {
          data: this.userEvents.map(value => value.start),
          label: this.userEvents.map(value => value.title),
          borderColor: 'rgb(123, 512, 341)',
          backgroundColor: 'rgb(123, 512, 341)',
          labels: this.userEvents.map(value => value.start)
        }
      );
      this.chartLabels = this.dataCotacao;
      this.chart.chart.update();
    });
  }

  updateApiDate() {
    const dataInicial = this.dateForm.get('dataInicial')?.value;
    const dataFinal = this.dateForm.get('dataFinal')?.value;
    this.dolarService.changeInitialDate(dataInicial);
    this.dolarService.changeFinalDate(dataFinal);
    this.getData();
  }

  fetchEventList(): void {
    this.getData();
    const id = this.userService.getUserId();
    this.userEvents = [];
    this.eventService.getUserEvents(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.userEvents.push({
          _id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end),
          sector: res[i].sector,
          local: res[i].sector,
        });
      }

      this.refresh.next(this.userEvents);
    });
  }
}
