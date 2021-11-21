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
  events: any[] = [];
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

  constructor(
    private dolarService: DolarService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.dateForm = this.formBuilder.group({
      dataInicial: ['01-01-2020', [Validators.required]],
      dataFinal: ['02-01-2020', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.chart.chart.update();
  }

  getData() {
    return this.dolarService.getDolarData().subscribe((data: any) => {
      this.cotacaoVenda = [];
      this.dataCotacao = [];
      this.chartData = [];
      this.events = data.value;
      this.cotacaoVenda = this.events.map((value) => value.cotacaoVenda);
      this.dataCotacao = this.events.map((value) =>
        moment(value.dataHoraCotacao).format('D MMM YY')
      );
      this.chartData.push({
        data: this.cotacaoVenda,
        label: 'Valor de Venda',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
      });
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
    this.events = [];
    this.eventService.getUserEvents(id).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.events.push({
          _id: res[i]._id,
          title: res[i].title,
          start: new Date(res[i].start),
          end: new Date(res[i].end),
        });
      }

      this.refresh.next(this.events);
    });
  }
}
