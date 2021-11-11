import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule, EventsRoutingModule],
  exports: [EventsComponent]
})

export class EventsModule {}