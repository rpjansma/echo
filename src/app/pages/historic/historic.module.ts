import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HistoricComponent } from './historic.component';
import { HistoricRoutingModule } from './historic-routing.module';

@NgModule({
  declarations: [HistoricComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule, HistoricRoutingModule],
  exports: [HistoricComponent]
})

export class HistoricModule {}