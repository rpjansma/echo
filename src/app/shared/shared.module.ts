import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {
    ErrorValidationMessageComponent
} from './components/error-validation-message/error-validation-message.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbPaginationModule, NgbAlertModule],
  declarations: [
    ErrorValidationMessageComponent,
    ModalLoadingComponent,
    GraphicComponent,
  ],
  exports: [
    ErrorValidationMessageComponent,
    ModalLoadingComponent,
    GraphicComponent,
  ],
})
export class SharedModule {}
