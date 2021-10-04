import { Component, OnInit } from '@angular/core';

import { DolarService } from '../../../core/services/dolar-service/dolar.service';

@Component({
  selector: 'echo-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

  constructor(private dolarService: DolarService ) { }

  getTest(){
    this.dolarService.getAllUsers();
  }

  ngOnInit(): void {
  }

}
