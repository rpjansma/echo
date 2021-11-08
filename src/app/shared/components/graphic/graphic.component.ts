import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DolarService } from '../../../core/services/dolar-service/dolar.service';
import { DolarServiceInterface, DolarServiceInterfaceApi } from '../../interfaces/dolar-interface';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  events: any[] = [];

  dateForm: FormGroup;
  dolarEvents: Observable<DolarService>;
  data$: Observable<DolarService[]>;
  cotacaoCompra: number[] = [];
  cotacaoVenda: number[] = [];
  dataCotacao: any[] = [];
  myChart: Chart;
  private data = {
    labels: this.dataCotacao,
    datasets: [
      {
        label: 'Valor de Venda',
        backgroundColor: 'rgb(6C, 6C, 6C)',
        borderColor: 'rgb(6C, 6C, 6C)',
        data: this.cotacaoCompra,
      },
    ],
  };

  constructor(private dolarService: DolarService, private formBuilder: FormBuilder,) {
    this.dateForm = this.formBuilder.group({
      dataInicial: [
        '01-01-2020',
        [
          Validators.required,
        ],
      ],
      dataFinal: ['02-01-2020', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getData()
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    let config = {
      type: 'line' as ChartType,
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as ChartType,
          },
          title: {
            display: true,
            text: 'Variação do Dolar',
          },
        },
      },
    };
    this.myChart = new Chart(ctx, config as any);
  }

  getData() {
    return this.dolarService.getDolarData().subscribe((data: any) => {
      this.events = data.value;
      this.cotacaoCompra = this.events.map((value) => value.cotacaoCompra);
      this.cotacaoVenda = this.events.map((value) => value.cotacaoVenda);
      this.dataCotacao = this.events.map((value) => value.dataHoraCotacao);
    });
  }

  updateChart() {
    this.getData();
    this.myChart.data.datasets.map(valor => valor.data = this.cotacaoVenda)
    this.myChart.data.labels = this.dataCotacao;
    this.myChart.update();
  }

  updateApiDate() {
    const dataInicial = this.dateForm.get('dataInicial')?.value;
    const dataFinal = this.dateForm.get('dataFinal')?.value;
    this.dolarService.changeInitialDate(dataInicial)
    this.dolarService.changeFinalDate(dataFinal)
  }
}
