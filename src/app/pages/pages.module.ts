import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AnalyseComponent } from '../shared/components/analyse/analyse.component';
import { HistoricComponent } from './historic/historic.component';

@NgModule({
  declarations: [
    
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [],
})
export class PagesModule {}