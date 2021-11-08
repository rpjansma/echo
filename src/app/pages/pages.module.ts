import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  exports: [],
})
export class PagesModule {}