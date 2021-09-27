

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    ErrorValidationMessageComponent
} from './components/error-validation-message/error-validation-message.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ErrorValidationMessageComponent,
  ],
  exports: [
    ErrorValidationMessageComponent
  ]
})
export class SharedModule {}
