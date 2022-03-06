import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/core/services/user-service/user.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService } from '../../../core/services/event-service/event.service';
import { IpcaService } from '../../../core/services/ipca-service/ipca.service';
import { NewsService } from '../../../core/services/news-service/news.service';
import { PtaxService } from '../../../core/services/ptax-service/ptax.service';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  refresh: BehaviorSubject<any> = new BehaviorSubject(null);
  ipcaEvents: any[] = [];
  dolarEvents: any[] = [];
  userEvents: any[] = [];
  newsEvents: any[] = [];
  dateForm: FormGroup;
  cotacaoVenda = [];
  resultadoIpca = [];
  dataCotacao: any[] = [];
  noticiaTitle = [];
  noticiaData = [];
  noticiaEx = ['potato', 'batata'];

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
    private ptaxService: PtaxService,
    private ipcaService: IpcaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService,
    private newsService: NewsService
  ) {
    this.dateForm = this.formBuilder.group({
      dataInicial: ['01-01-2020', [Validators.required]],
      dataFinal: ['11-22-2020', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getIpcaData();
    this.chart.chart.update();
  }

  getIpcaData() {
    this.cotacaoVenda = [];
    this.dataCotacao = [];
    this.chartData = [];

    this.ipcaService.getIpcaData().subscribe((data: any) => {
      this.ipcaEvents = data;
      this.resultadoIpca = this.ipcaEvents.map((value) => value.valor);
      this.dataCotacao = this.ipcaEvents.map((value) =>
        moment(value.data).format('D MMM YY')
      );
      this.chartData.push({
        data: this.resultadoIpca,
        label: 'Ipca',
        borderColor: 'rgb(6A,82,FB)',
        backgroundColor: 'rgb(6A,82,FB)',
      });
      this.chartLabels = this.dataCotacao;
      this.chart.chart.update();
    });
    /*this.dolarService.getDolarData().subscribe((data: any) => {
      this.dolarEvents = data;
      this.cotacaoVenda = this.dolarEvents.map((value) => value.cotacaoVenda);
      this.dataCotacao = this.dolarEvents.map((value) =>
        moment(value.dataHoraCotacao).format('D MMM YY')
      );
      this.chartData.push(
        {
          data: this.cotacaoVenda,
          label: 'Dolar (Venda)',
          borderColor: 'rgb(6C, 6C, 6C)',
          backgroundColor: 'rgb(6C, 6C, 6C)',
        }
      );
      this.chartLabels = this.dataCotacao;
      this.chart.chart.update();
    });*/
  }

  getDolarData() {
    this.cotacaoVenda = [];
    this.dataCotacao = [];
    this.chartData = [];

    this.ipcaService.getIpcaData().subscribe((data: any) => {
      this.ipcaEvents = data;
      this.resultadoIpca = this.ipcaEvents.map((value) => value.valor);
      this.dataCotacao = this.ipcaEvents.map((value) =>
        moment(value.data).format('D MMM YY')
      );
      this.chartData.push({
        data: this.resultadoIpca,
        label: 'Ipca',
        borderColor: 'rgb(6A,82,FB)',
        backgroundColor: 'rgb(6A,82,FB)',
      });
      this.chartLabels = this.dataCotacao;
      this.chart.chart.update();
    });
    /*this.dolarService.getDolarData().subscribe((data: any) => {
      this.dolarEvents = data.value;
      this.cotacaoVenda = this.dolarEvents.map((value) => value.cotacaoVenda);
      this.dataCotacao = this.dolarEvents.map((value) =>
        moment(value.dataHoraCotacao).format('D MMM YY')
      );
      this.chartData.push(
        {
          data: this.cotacaoVenda,
          label: 'Dolar (Venda)',
          borderColor: 'rgb(6C, 6C, 6C)',
          backgroundColor: 'rgb(6C, 6C, 6C)',
        }
      );
      this.chartLabels = this.dataCotacao;
      this.chart.chart.update();
    });*/
  }

  updateNews() {
    this.newsService.getNewsData().subscribe((res) => {
      console.log(res);

      let articles = res.articles;

      for (let i = 0; i < articles.length; i++) {
        this.newsEvents.push({
          title: articles[i].title,
          date: new Date(articles[i].publishedAt),
        });
      }
      this.noticiaTitle = this.newsEvents.map((value) => value.title);
      this.noticiaData = this.newsEvents.map((value) => value.date);
      this.chartData.push({
        data: this.cotacaoVenda,
        label: 'Noticia',
        borderColor: 'rgb(6C, 6C, 6C)',
        backgroundColor: 'rgb(6C, 6C, 6C)',
        labels: this.noticiaData,
      });
    });
    this.chart.chart.update();
  }

  updateApiDate() {
    const dataInicial = this.dateForm.get('dataInicial')?.value;
    const dataFinal = this.dateForm.get('dataFinal')?.value;
    this.ptaxService.changeInitialDate(dataInicial);
    this.ptaxService.changeFinalDate(dataFinal);
    this.getIpcaData();
  }

  // fetchEventList(): void {
  //   this.getData();
  //   const id = this.userService.getUserId();
  //   this.userEvents = [];
  //   this.eventService.getUserEvents(id).subscribe((res) => {
  //     for (let i = 0; i < res.length; i++) {
  //       this.userEvents.push({
  //         _id: res[i]._id,
  //         title: res[i].title,
  //         start: new Date(res[i].start),
  //         end: new Date(res[i].end),
  //         sector: res[i].sector,
  //         local: res[i].sector,
  //       });
  //     }

  //     this.refresh.next(this.userEvents);
  //   });
  // }
}
