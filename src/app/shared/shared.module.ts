

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    ErrorValidationMessageComponent
} from './components/error-validation-message/error-validation-message.component';
import { ModalLoadingComponent } from './components/modal-loading/modal-loading.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ErrorValidationMessageComponent, ModalLoadingComponent
  ],
  exports: [
    ErrorValidationMessageComponent, ModalLoadingComponent
  ]
})
export class SharedModule {}
